# Angular-Personal-Dashboard

## <ins>Bookmarks GUI</ins>

-Using SCSS feature to write &:hover and &:active as nested styles instead of having to use new blocks.

```scss
.bookmark-tile {
  background: rgba(black, 0.5);
  border-radius: 1rem;
  width: 110px;
  height: 110px;
  padding: 8px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;

  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background-color: rgba(black, 0.7);
    backdrop-filter: blur(3px);
  }
  &:active {
    background-color: rgba(black, 0.8);
    transform: translateY(2px);
    transition: 0;
  }
}
```

-Styling that stops text from wrapping and/or overflowing and places ellipses before it happens.

```scss
.tile-text {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.95);

  overflow: hidden;
  max-width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

-Adding min-height of 0 to stop menu from being pushed down and enables a scroll-bar when overflow-y: auto; is set on the bookmarks-wrapper.

app.component.scss

```scss
.middle-section-content {
  flex-grow: 1;
  min-height: 0; //<---
}
```

bookmarks.component.scss

```scss
.bookmarks-wrapper {
  height: 100%;
  overflow-y: auto; //<---
}
```

## <ins>Todos GUI</ins>
