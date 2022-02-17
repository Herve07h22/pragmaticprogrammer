import { useCallback, useState } from "react";

export type useButtonProps = {
  onClick?: (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => Promise<void>;
};

export const useButton = ({ onClick }: useButtonProps) => {
  const [pending, setPending] = useState(false);
  const onClickWithPending = useCallback(
    async (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (onClick) {
        setPending(true);
        await onClick(event);
        setPending(false);
      }
    },
    [onClick]
  );
  return {
    onClick: onClickWithPending,
    pending,
  };
};
