import { Stack, StackProps } from "@mui/material";

export interface SectionWrapperProps extends StackProps {}

const SectionWrapper = (props: SectionWrapperProps) => {
  const { children, ...restProps } = props;
  return (
    <Stack
      width={1}
      component={"section"}
      maxWidth={1920}
      px={basePx}
      py={basePy}
      {...restProps}
    >
      {children}
    </Stack>
  );
};

export default SectionWrapper;

export const basePx = {
  xs: 0.5,
  sm: 4,
  xxl: 6,
};
export const basePy = {
  xs: 2,
  lg: 4,
  xxl: 6,
};
