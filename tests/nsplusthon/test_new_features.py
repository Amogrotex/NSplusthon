import pytest
from nsplusthon import SoroushClient, ClientPool, Button
from nsplusthon.sessions import StringSession, MemorySession, export_session
from nsplusthon.tl.custom.button import KeyboardBuilder


def test_button_builder():
    builder = Button.builder(inline=True)
    builder.row(Button.text("Button 1"), Button.text("Button 2"))
    builder.grid([Button.text("A"), Button.text("B"), Button.text("C"), Button.text("D")], cols=2)
    rows = builder.build()
    assert len(rows) == 3
    assert len(rows[0]) == 2
    assert len(rows[1]) == 2
    assert len(rows[2]) == 2


def test_client_pool_init():
    s1 = StringSession()
    s2 = StringSession()
    pool = ClientPool([s1, s2])
    assert len(pool) == 2
    c1 = pool.get_client()
    c2 = pool.get_client()
    assert c1 is not c2


def test_session_export():
    s_mem = MemorySession()
    s_mem.set_dc(1, "127.0.0.1", 443)
    s_str = export_session(s_mem, target_type='string')
    assert isinstance(s_str, StringSession)
    assert s_str.dc_id == 1
    assert s_str.server_address == "127.0.0.1"
