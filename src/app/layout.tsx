import { ReactNode } from "react";
import ThemeRegistry from "@theme/theme-registry";
import BaseLayout from "@c/layout";
import "../../node_modules/swiper/swiper-bundle.css";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = (props: RootLayoutProps) => {
  const { children } = props;

  return (
    <html lang="en">
      <ThemeRegistry>
        <body>
          <BaseLayout>{children}</BaseLayout>
        </body>
      </ThemeRegistry>
    </html>
  );
};
export default RootLayout;
