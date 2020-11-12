import { renderHook, act } from "@testing-library/react-hooks";
import { useHighlighter } from "./index";

const defaultProps = {
  searchTerms: "hello",
  textToSearch: "hello world",
};

const getProps = (updatedProps = {}) => {
  return {
    ...defaultProps,
    ...updatedProps,
  };
};

it("should use highlighter", () => {
  const { result } = renderHook(() => useHighlighter(getProps()));

  expect(result.current.activeIndex).toEqual(0);
  expect(result.current.totalHighlights).toEqual(1);
  expect(result.current.chunks).toMatchInlineSnapshot(`
    Array [
      Object {
        "active": true,
        "end": 5,
        "highlight": true,
        "start": 0,
        "text": "hello",
      },
      Object {
        "active": false,
        "end": 11,
        "highlight": false,
        "start": 5,
        "text": " world",
      },
    ]
  `);
});

it("can handle multiple search terms", () => {
  const { result } = renderHook(() =>
    useHighlighter(
      getProps({
        searchTerms: "hello wo",
      })
    )
  );

  expect(result.current.activeIndex).toEqual(0);
  expect(result.current.totalHighlights).toEqual(2);
  expect(result.current.chunks).toMatchInlineSnapshot(`
    Array [
      Object {
        "active": true,
        "end": 5,
        "highlight": true,
        "start": 0,
        "text": "hello",
      },
      Object {
        "active": false,
        "end": 6,
        "highlight": false,
        "start": 5,
        "text": " ",
      },
      Object {
        "active": false,
        "end": 8,
        "highlight": true,
        "start": 6,
        "text": "wo",
      },
      Object {
        "active": false,
        "end": 11,
        "highlight": false,
        "start": 8,
        "text": "rld",
      },
    ]
  `);
});

it("can update active index", () => {
  const { result } = renderHook(() =>
    useHighlighter(getProps({ searchTerms: "hello wo" }))
  );

  act(() => {
    result.current.setActiveIndex(1);
  });

  expect(result.current.activeIndex).toEqual(1);
  expect(result.current.chunks).toMatchInlineSnapshot(`
    Array [
      Object {
        "active": false,
        "end": 5,
        "highlight": true,
        "start": 0,
        "text": "hello",
      },
      Object {
        "active": false,
        "end": 6,
        "highlight": false,
        "start": 5,
        "text": " ",
      },
      Object {
        "active": true,
        "end": 8,
        "highlight": true,
        "start": 6,
        "text": "wo",
      },
      Object {
        "active": false,
        "end": 11,
        "highlight": false,
        "start": 8,
        "text": "rld",
      },
    ]
  `);
});

it("should update when search term is updated", () => {
  const { result } = renderHook(() =>
    useHighlighter(getProps({ searchTerms: "hello wo" }))
  );

  act(() => {
    result.current.setSearchTerms("he wo");
  });

  expect(result.current.chunks).toMatchInlineSnapshot(`
    Array [
      Object {
        "active": true,
        "end": 2,
        "highlight": true,
        "start": 0,
        "text": "he",
      },
      Object {
        "active": false,
        "end": 6,
        "highlight": false,
        "start": 2,
        "text": "llo ",
      },
      Object {
        "active": false,
        "end": 8,
        "highlight": true,
        "start": 6,
        "text": "wo",
      },
      Object {
        "active": false,
        "end": 11,
        "highlight": false,
        "start": 8,
        "text": "rld",
      },
    ]
  `);
});

it("should update when text to search is updated", () => {
  const { result } = renderHook(() =>
    useHighlighter(getProps({ searchTerms: "hello wo" }))
  );

  act(() => {
    result.current.setTextToSearch("goodbye world");
  });

  expect(result.current.chunks).toMatchInlineSnapshot(`
    Array [
      Object {
        "active": false,
        "end": 8,
        "highlight": false,
        "start": 0,
        "text": "goodbye ",
      },
      Object {
        "active": true,
        "end": 10,
        "highlight": true,
        "start": 8,
        "text": "wo",
      },
      Object {
        "active": false,
        "end": 13,
        "highlight": false,
        "start": 10,
        "text": "rld",
      },
    ]
  `);
});

it("should not error when text to search is undefined", () => {
  expect(() => {
    const { result } = renderHook(() =>
      useHighlighter(getProps({ textToSearch: undefined }))
    );

    expect(result.current.chunks).toMatchInlineSnapshot(`Array []`);
  }).not.toThrow();
});

it("should handle when search terms are undefined", () => {
  expect(() => {
    const { result } = renderHook(() =>
      useHighlighter(getProps({ searchTerms: undefined }))
    );

    expect(result.current.chunks).toMatchInlineSnapshot(`
      Array [
        Object {
          "active": false,
          "end": 11,
          "highlight": false,
          "start": 0,
          "text": "hello world",
        },
      ]
    `);
  }).not.toThrow();
});
