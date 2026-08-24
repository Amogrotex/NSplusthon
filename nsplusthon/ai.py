"""
AI, Voice & Intent Helper Suite for NSplusthon.

Features:
- Offline Persian intent-to-command router
- Zero-leak security redaction layer for API keys, tokens & phone numbers
- Multi-provider AI helper client interface with fallback logic
"""

from __future__ import annotations

import re
from typing import Dict, List, Optional, Tuple, Callable, Any

# Security redaction patterns for scrubbing outputs before sending
API_KEY_PATTERNS = [
    re.compile(r"ghp_[a-zA-Z0-9]{36}"),  # GitHub PAT
    re.compile(r"sk-[a-zA-Z0-9_]{32,}"),  # OpenAI/DeepSeek key
    re.compile(r"\b\d{8,12}:[a-zA-Z0-9_-]{30,50}\b"),  # Telegram/Soroush bot token
    re.compile(r"\b(?:\+?98|0)?9\d{9}\b"),  # Iranian phone numbers
]


class RedactionGuard:
    """Sanitizes text outputs by scrubbing sensitive API keys, bot tokens, and phone numbers."""

    @staticmethod
    def sanitize(text: str, replacement: str = "[REDACTED]") -> str:
        if not text:
            return ""

        cleaned = text
        for pattern in API_KEY_PATTERNS:
            cleaned = pattern.sub(replacement, cleaned)
        return cleaned


class IntentRouter:
    """Offline rule-based intent router for converting Persian natural text to bot actions."""

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
        """Register default common Persian group commands."""
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
    """Async AI helper interface supporting primary and fallback provider callbacks."""

    def __init__(self, providers: Optional[List[Callable[[str], Any]]] = None):
        self.providers = providers or []

    def add_provider(self, provider_fn: Callable[[str], Any]) -> None:
        self.providers.append(provider_fn)

    async def generate_response(self, prompt: str) -> str:
        """Attempt generating response with primary provider, falling back on error."""
        if not self.providers:
            raise RuntimeError("No AI providers registered in MultiProviderAI.")

        last_error = None
        for provider in self.providers:
            try:
                result = provider(prompt)
                if hasattr(result, "__await__"):
                    result = await result
                if result and isinstance(result, str):
                    return RedactionGuard.sanitize(result)
            except Exception as e:
                last_error = e
                continue

        raise RuntimeError(f"All AI providers failed. Last error: {last_error}")
