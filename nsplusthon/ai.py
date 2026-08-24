"""AI client wrapper, offline intent router, and token sanitizer."""

from __future__ import annotations

import inspect
import re
from typing import Any, Callable, Dict, List, Optional, Tuple

API_KEY_PATTERNS = [
    re.compile(r"ghp_[a-zA-Z0-9]{36}"),
    re.compile(r"github_pat_[a-zA-Z0-9_]{20,}"),
    re.compile(r"sk-[a-zA-Z0-9_]{32,}"),
    re.compile(r"pypi-[a-zA-Z0-9_\-]{20,}"),
    re.compile(r"\b\d{8,12}:[a-zA-Z0-9_-]{30,50}\b"),
    re.compile(r"\b(?:\+?98|0)?9\d{9}\b"),
]


class RedactionGuard:
    """Sanitizes text outputs by masking sensitive API tokens and phone numbers."""

    @staticmethod
    def sanitize(text: str, replacement: str = "[REDACTED]") -> str:
        if not text:
            return ""

        cleaned = text
        for pattern in API_KEY_PATTERNS:
            cleaned = pattern.sub(replacement, cleaned)
        return cleaned


class IntentRouter:
    """Offline rule-based intent router matching text patterns to callbacks."""

    def __init__(self):
        self._rules: List[Tuple[re.Pattern, str, Callable]] = []

    def register(self, pattern: str, intent_name: str, handler: Callable) -> None:
        regex = re.compile(pattern, re.IGNORECASE)
        self._rules.append((regex, intent_name, handler))

    def match(self, text: str) -> Optional[Tuple[str, Callable, re.Match]]:
        if not text:
            return None

        for regex, intent_name, handler in self._rules:
            m = regex.search(text)
            if m:
                return intent_name, handler, m
        return None

    def add_default_persian_rules(self, rules_dict: Dict[str, Callable]) -> None:
        defaults = [
            (r"(?:قوانین|قانون|مقررات)\s*(?:گروه|گپ)?", "rules"),
            (r"(?:آمار|اطلاعات)\s*(?:گروه|گپ)?", "stats"),
            (r"(?:سکوت|خاموش|ببند|قفل)\s*(?:کن|شروع)?", "mute"),
            (r"(?:راهنما|راهنمایی|کمک)\s*(?:کن)?", "help"),
        ]
        for pattern, intent in defaults:
            if intent in rules_dict:
                self.register(pattern, intent, rules_dict[intent])


class MultiProviderAI:
    """Call a list of provider callables, falling back on the next on failure.

    This is a thin helper, not an SDK. Each provider is ``(prompt) -> str``
    and may be sync or async.
    """

    def __init__(self, providers: Optional[List[Callable[[str], Any]]] = None):
        self.providers = list(providers or [])

    def add_provider(self, provider_fn: Callable[[str], Any]) -> None:
        self.providers.append(provider_fn)

    async def generate_response(self, prompt: str) -> str:
        if not self.providers:
            raise RuntimeError("No AI providers registered.")

        last_error = None
        for provider in self.providers:
            try:
                result = provider(prompt)
                if inspect.isawaitable(result):
                    result = await result
                if result is None:
                    continue
                text = result if isinstance(result, str) else str(result)
                if text:
                    return RedactionGuard.sanitize(text)
            except Exception as e:
                last_error = e
                continue

        raise RuntimeError(f"All AI providers failed. Last error: {last_error}")


__all__ = ["RedactionGuard", "IntentRouter", "MultiProviderAI"]
