import asyncio
import itertools
import logging
from typing import List, Union, Callable
from .client.soroushclient import SoroushClient

_log = logging.getLogger(__name__)


class ClientPool:
    """
    Manages a pool of SoroushClient accounts for load balancing and high throughput.
    """
    def __init__(self, clients_or_sessions, **client_kwargs):
        self.clients: List[SoroushClient] = []
        for item in clients_or_sessions:
            if isinstance(item, SoroushClient):
                self.clients.append(item)
            else:
                self.clients.append(SoroushClient(item, **client_kwargs))
        self._round_robin = itertools.cycle(self.clients) if self.clients else None

    def __len__(self):
        return len(self.clients)

    def __iter__(self):
        return iter(self.clients)

    def get_client(self) -> SoroushClient:
        """Return the next client in round-robin order."""
        if not self.clients:
            raise ValueError("No clients in ClientPool")
        return next(self._round_robin)

    async def start(self):
        """Start all clients concurrently."""
        tasks = [c.connect() for c in self.clients]
        return await asyncio.gather(*tasks, return_exceptions=True)

    async def disconnect(self):
        """Disconnect all clients concurrently."""
        tasks = [c.disconnect() for c in self.clients]
        return await asyncio.gather(*tasks, return_exceptions=True)

    def on(self, event_builder):
        """Register an event handler across all clients in the pool."""
        def decorator(callback):
            for c in self.clients:
                c.add_event_handler(callback, event_builder)
            return callback
        return decorator

    async def broadcast(self, chats, message, *, delay=0.3, **kwargs):
        """Distribute messages across pool accounts in round-robin order."""
        results = []
        for chat in chats:
            client = self.get_client()
            try:
                msg = await client.send_message(chat, message, **kwargs)
                results.append(msg)
            except Exception as e:
                _log.warning("Broadcast failed for chat %s: %s", chat, e)
                results.append(None)
            if delay > 0:
                await asyncio.sleep(delay)
        return results
