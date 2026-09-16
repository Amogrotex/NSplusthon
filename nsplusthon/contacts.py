"""Result objects for contact import and explicit member invitations."""
from dataclasses import dataclass, field
from typing import Any, List, Optional


@dataclass
class AddContactResult:
    """status: imported, retry_required, or not_imported (not proof of no account)."""
    status: str
    user: Any = field(default=None, repr=False)
    response: Any = field(default=None, repr=False)


@dataclass
class InviteResult:
    """One input user's result; error/response retain the original server objects."""
    user: Any = field(repr=False)
    status: str
    error: Optional[Exception] = field(default=None, repr=False)
    response: Any = field(default=None, repr=False)


@dataclass
class InviteReport:
    """Ordered results. stopped=True means remaining users were not attempted."""
    results: List[InviteResult]
    stopped: bool = False

    @property
    def invited(self):
        return [result.user for result in self.results if result.status == 'invited']
