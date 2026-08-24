"""Pagination helpers for building paginated inline keyboard rows."""

from __future__ import annotations

import math
from typing import Any, Callable, Generic, List, Optional, TypeVar
from .tl.custom.button import Button

T = TypeVar("T")


class Paginator(Generic[T]):
    """Helper class for paginating lists and rendering inline keyboard rows."""

    def __init__(self, items: List[T], page_size: int = 5):
        if page_size < 1:
            raise ValueError("page_size must be at least 1")
        self.items = list(items)
        self.page_size = page_size

    @property
    def total_items(self) -> int:
        return len(self.items)

    @property
    def total_pages(self) -> int:
        if not self.items:
            return 1
        return math.ceil(len(self.items) / self.page_size)

    def get_page(self, page: int) -> List[T]:
        page = max(1, min(page, self.total_pages))
        start = (page - 1) * self.page_size
        end = start + self.page_size
        return self.items[start:end]

    def build_navigation_row(
        self,
        current_page: int,
        callback_prefix: str = "page",
        prev_label: str = "◀️ قبلی",
        next_label: str = "بعدی ▶️",
        page_format: str = "صفحه {page}/{total}",
    ) -> List[Any]:
        current_page = max(1, min(current_page, self.total_pages))
        total = self.total_pages

        row = []

        if current_page > 1:
            row.append(Button.inline(prev_label, data=f"{callback_prefix}:{current_page - 1}"))
        else:
            row.append(Button.inline("❌", data=f"{callback_prefix}:noop"))

        indicator = page_format.format(page=current_page, total=total)
        row.append(Button.inline(indicator, data=f"{callback_prefix}:noop"))

        if current_page < total:
            row.append(Button.inline(next_label, data=f"{callback_prefix}:{current_page + 1}"))
        else:
            row.append(Button.inline("❌", data=f"{callback_prefix}:noop"))

        return row

    def build_keyboard(
        self,
        current_page: int,
        item_button_factory: Optional[Callable[[T, int], Any]] = None,
        callback_prefix: str = "page",
        prev_label: str = "◀️ قبلی",
        next_label: str = "بعدی ▶️",
    ) -> List[List[Any]]:
        keyboard = []
        page_items = self.get_page(current_page)

        if item_button_factory:
            start_index = (current_page - 1) * self.page_size
            for idx, item in enumerate(page_items):
                btn = item_button_factory(item, start_index + idx)
                if isinstance(btn, list):
                    keyboard.append(btn)
                else:
                    keyboard.append([btn])

        nav_row = self.build_navigation_row(
            current_page=current_page,
            callback_prefix=callback_prefix,
            prev_label=prev_label,
            next_label=next_label,
        )
        keyboard.append(nav_row)
        return keyboard
