import { renderHook, act } from "@testing-library/react-hooks";
import { useButton } from "./useButton";

const onClick = async () => {
  setTimeout(() => Promise.resolve(), 0);
};

test("The button cannot have a pending state if there is no onClick callback provided", async () => {
  const { result } = renderHook(() => useButton({}));
  expect(result.current.pending).toBe(false);
});

test("The button have a pending state when onClick is called", async () => {
  const { result } = renderHook(() => useButton({ onClick }));
  act(() => {
    result.current.onClick();
  });
  expect(result.current.pending).toBe(true);
});

test("The button doesnt have a pending state any more when onClick is resolved", async () => {
  const { result } = renderHook(() => useButton({ onClick }));
  await act(async () => {
    await result.current.onClick();
  });
  expect(result.current.pending).toBe(false);
});
