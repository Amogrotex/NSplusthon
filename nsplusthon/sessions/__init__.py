from .abstract import Session
from .memory import MemorySession
from .sqlite import SQLiteSession
from .string import StringSession


def export_session(source_session, target_type='string'):
    """
    Export or convert a session between SQLiteSession, StringSession, and MemorySession.
    """
    from .string import StringSession
    from .sqlite import SQLiteSession
    from .memory import MemorySession
    
    if target_type == 'string':
        target = StringSession()
    elif target_type == 'memory':
        target = MemorySession()
    elif target_type == 'sqlite':
        target = SQLiteSession(getattr(source_session, 'filename', None))
    else:
        raise ValueError(f"Unknown target_type: {target_type}")

    source_session.clone(target)
    return target
