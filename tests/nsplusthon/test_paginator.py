from nsplusthon.paginator import Paginator


def test_paginator():
    items = list(range(1, 13))
    pag = Paginator(items, page_size=5)

    assert pag.total_pages == 3
    assert pag.get_page(1) == [1, 2, 3, 4, 5]
    assert pag.get_page(3) == [11, 12]

    keyboard = pag.build_keyboard(current_page=1, callback_prefix="test")
    assert len(keyboard) == 1
    nav_buttons = keyboard[0]
    assert len(nav_buttons) == 3
