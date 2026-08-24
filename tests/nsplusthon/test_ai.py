from nsplusthon.ai import RedactionGuard, IntentRouter


def test_redaction_guard():
    token_str = "Bot token: 123456789:abcdefghijklmnopqrstuvwxyz0123456789 and phone 09123456789"
    cleaned = RedactionGuard.sanitize(token_str)
    assert "09123456789" not in cleaned
    assert "[REDACTED]" in cleaned


def test_redacts_github_and_pypi_tokens():
    cleaned = RedactionGuard.sanitize(
        "tok ghp_abcdefghijklmnopqrstuvwxyz0123456789 and pypi-abcdefghijklmnopqrstuv"
    )
    assert "ghp_" not in cleaned
    assert "pypi-" not in cleaned


def test_intent_router():
    router = IntentRouter()
    matched_intents = []

    def rules_handler(m):
        matched_intents.append("rules")

    router.add_default_persian_rules({"rules": rules_handler})

    res = router.match("لطفا قوانین گروه رو نشون بده")
    assert res is not None
    intent_name, handler, match = res
    assert intent_name == "rules"
    handler(match)
    assert matched_intents == ["rules"]
