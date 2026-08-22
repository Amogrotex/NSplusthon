"""Public type aliases for NSplusthon (Python 3.9+)."""

from __future__ import annotations

import datetime
from typing import BinaryIO, Callable, Optional, Sequence, Type, Union

from . import helpers
from .tl import custom, types

Phone = str
Username = str
PeerID = int
Entity = Union[types.User, types.Chat, types.Channel]
FullEntity = Union[
    types.UserFull,
    types.messages.ChatFull,
    types.ChatFull,
    types.ChannelFull,
]

EntityLike = Union[
    Phone,
    Username,
    PeerID,
    types.TypePeer,
    types.TypeInputPeer,
    Entity,
    FullEntity,
]
EntitiesLike = Union[EntityLike, Sequence[EntityLike]]

ButtonLike = Union[types.TypeKeyboardButton, custom.Button]
MarkupLike = Union[
    types.TypeReplyMarkup,
    ButtonLike,
    Sequence[ButtonLike],
    Sequence[Sequence[ButtonLike]],
]

TotalList = helpers.TotalList

DateLike = Optional[
    Union[float, datetime.datetime, datetime.date, datetime.timedelta]
]

LocalPath = str
ExternalUrl = str
BotFileID = str
FileLike = Union[
    LocalPath,
    ExternalUrl,
    BotFileID,
    bytes,
    BinaryIO,
    types.TypeMessageMedia,
    types.TypeInputFile,
    types.TypeInputFileLocation,
    types.TypeInputMedia,
    types.TypePhoto,
    types.TypeInputPhoto,
    types.TypeDocument,
    types.TypeInputDocument,
]

OutFileLike = Union[str, Type[bytes], BinaryIO]

MessageLike = Union[str, types.Message]
MessageIDLike = Union[int, types.Message, types.TypeInputMessage]

ProgressCallback = Callable[[int, int], None]

__all__ = [
    "Phone",
    "Username",
    "PeerID",
    "Entity",
    "FullEntity",
    "EntityLike",
    "EntitiesLike",
    "ButtonLike",
    "MarkupLike",
    "TotalList",
    "DateLike",
    "LocalPath",
    "ExternalUrl",
    "BotFileID",
    "FileLike",
    "OutFileLike",
    "MessageLike",
    "MessageIDLike",
    "ProgressCallback",
]
