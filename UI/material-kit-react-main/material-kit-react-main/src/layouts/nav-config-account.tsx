import { useTranslation } from "react-i18next";
import { Iconify } from "src/components/iconify";

import type { AccountPopoverProps } from "./components/account-popover";

export function useAccountMenu(): AccountPopoverProps["data"] {
  const { t } = useTranslation();

  return [
    {
      label: t("nav.home"),
      href: "/",
      icon: <Iconify width={22} icon="solar:home-angle-bold-duotone" />,
    },
    {
      label: t("nav.profile"),
      href: "#",
      icon: <Iconify width={22} icon="solar:shield-keyhole-bold-duotone" />,
    },
    {
      label: t("nav.settings"),
      href: "#",
      icon: <Iconify width={22} icon="solar:settings-bold-duotone" />,
    },
  ];
}