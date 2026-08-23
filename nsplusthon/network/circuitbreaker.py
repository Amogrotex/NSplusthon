import time
import logging

_log = logging.getLogger(__name__)


class CircuitBreaker:
    """
    Circuit breaker for MTProto transport to isolate DC failures
    and recover gracefully without freezing sender loops.
    """
    CLOSED = "CLOSED"
    OPEN = "OPEN"
    HALF_OPEN = "HALF_OPEN"

    def __init__(self, failure_threshold=5, recovery_timeout=15.0, half_open_attempts=2):
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.half_open_attempts = half_open_attempts

        self.state = self.CLOSED
        self.failure_count = 0
        self.success_count = 0
        self.last_failure_time = 0.0

    def record_success(self):
        """Record a successful request."""
        if self.state == self.HALF_OPEN:
            self.success_count += 1
            if self.success_count >= self.half_open_attempts:
                self.state = self.CLOSED
                self.failure_count = 0
                self.success_count = 0
                _log.info("Transport circuit breaker recovered: state=CLOSED")
        elif self.state == self.CLOSED:
            self.failure_count = 0

    def record_failure(self):
        """Record a connection or timeout failure."""
        self.failure_count += 1
        self.last_failure_time = time.monotonic()
        if self.failure_count >= self.failure_threshold:
            self.state = self.OPEN
            _log.warning("Transport circuit breaker tripped: state=OPEN (DC experiencing failure)")

    def can_attempt(self):
        """Check if request attempt is allowed through the circuit breaker."""
        if self.state == self.CLOSED:
            return True
        now = time.monotonic()
        if self.state == self.OPEN:
            if now - self.last_failure_time >= self.recovery_timeout:
                self.state = self.HALF_OPEN
                self.success_count = 0
                _log.info("Transport circuit breaker probing: state=HALF_OPEN")
                return True
            return False
        return True  # HALF_OPEN
