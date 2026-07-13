import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { useEffect } from 'react';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import { useTheme } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import Drawer, { drawerClasses } from '@mui/material/Drawer';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';

import { NavUpgrade } from '../components/nav-upgrade';
import { WorkspacesPopover } from '../components/workspaces-popover';

import type { NavItem } from '../nav-config-dashboard';
import type { WorkspacesPopoverProps } from '../components/workspaces-popover';
import { useTranslation } from 'react-i18next';

import { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


// ----------------------------------------------------------------------

export type NavContentProps = {
  data: NavItem[];
  slots?: {
    topArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
  workspaces: WorkspacesPopoverProps['data'];
  sx?: SxProps<Theme>;
};

export function NavDesktop({
  sx,
  data,
  slots,
  workspaces,
  layoutQuery,
}: NavContentProps & { layoutQuery: Breakpoint }) {
  const theme = useTheme();



  return (
    <Box
      sx={{
        pt: 2.5,
        px: 2.5,
        top: 0,
        left: 0,
        height: 1,
        display: 'none',
        position: 'fixed',
        flexDirection: 'column',
        zIndex: 'var(--layout-nav-zIndex)',
        width: 'var(--layout-nav-vertical-width)',
        borderRight: `1px solid ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)}`,
        [theme.breakpoints.up(layoutQuery)]: {
          display: 'flex',
        },
        ...sx,
      }}
    >
      <NavContent data={data} slots={slots} workspaces={workspaces} />
    </Box>
  );
}

// ----------------------------------------------------------------------

export function NavMobile({
  sx,
  data,
  open,
  slots,
  onClose,
  workspaces,
}: NavContentProps & { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          pt: 2.5,
          px: 2.5,
          overflow: 'unset',
          width: 'var(--layout-nav-mobile-width)',
          ...sx,
        },
      }}
    >
      <NavContent data={data} slots={slots} workspaces={workspaces} />
    </Drawer>
  );
}

function NavItemNode({
  item,
  pathname,
  t,
  depth = 0,
  expanded,
  setExpanded,
}: {
  item: NavItem;
  pathname: string;
  t: (key: string) => string;
  depth?: number;
  expanded: string | null;
  setExpanded: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const hasChildren = !!item.children?.length;

  const open = expanded === item.title;

  const isActive = !!item.path && pathname === item.path;

  return (
    <>
      <ListItem disablePadding disableGutters >
        <ListItemButton
          disableGutters
          component={RouterLink}
          href={item.path ?? '#'}
          onClick={(e) => {
            if (hasChildren) {
              e.preventDefault();
              setExpanded((prev) => (prev === item.title ? null : item.title));
            }
          }}
          sx={(theme) => ({
            pl: 2 + depth * 3,
            py: 1,
            gap: 2,
            pr: 1.5,
            minHeight: 44,
            borderRadius: 0.75,
            color: theme.vars.palette.text.secondary,

            ...(isActive && {
              color: theme.vars.palette.primary.main,
              bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.08),
            }),
          })}
        >
          {item.icon && (
            <Box sx={{ width: 24, height: 24 }}>
              {item.icon}
            </Box>
          )}

          <Box sx={{
            flexGrow: 1,
          }}>
            {t(item.title)}
          </Box>

          {item.info}

          {hasChildren && (
            <KeyboardArrowRightIcon
              fontSize="small"
              sx={{
                transition: 'transform 0.2s ease',
                transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
              }}
            />
          )}
        </ListItemButton>
      </ListItem>

      {hasChildren && (
        <Collapse in={open}>
          <Box
            sx={{
              position: 'relative',
              ml: 5,
              py: 0.5,
              display: 'flex',
              flexDirection: 'column',
              gap: 0.5,

              // Vertical line
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 6,
                bottom: 6,
                left: -14,
                width: '2px',
                borderRadius: 99,
                bgcolor: (theme) =>
                  varAlpha(theme.vars.palette.grey['500Channel'], 0.24),
              },
            }}
          >
            {item.children!.map((child) => (
              <NavItemNode
                key={child.title}
                item={child}
                pathname={pathname}
                t={t}
                depth={depth + 1}
                expanded={expanded}
                setExpanded={setExpanded}
              />
            ))}
          </Box>
        </Collapse>
      )}
    </>
  );
}

// ----------------------------------------------------------------------

export function NavContent({ data, slots, workspaces, sx }: NavContentProps) {

  const pathname = usePathname();
  useEffect(() => {
    const parent = data.find((item) =>
      item.children?.some((child) => pathname.startsWith(child.path ?? ''))
    );

    setExpanded(parent?.title ?? null);
  }, [pathname, data]);
  const { t } = useTranslation(); // ✅ add this
  const [expanded, setExpanded] = useState<string | null>(() => {
    const parent = data.find((item) =>
      item.children?.some((child) => pathname.startsWith(child.path ?? ''))
    );



    return parent?.title ?? null;
  });
  return (
    <>
      <Logo />

      {slots?.topArea}

      <WorkspacesPopover data={workspaces} sx={{ my: 2 }} />

      <Scrollbar fillContent>
        <Box
          component="nav"
          sx={[
            {
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
            },
            ...(Array.isArray(sx) ? sx : [sx]),
          ]}
        >
          <Box
            component="ul"
            sx={{
              gap: 0.5,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {data.map((item) => (
              <NavItemNode
                key={item.title}
                item={item}
                pathname={pathname}
                t={t}
                expanded={expanded}
                setExpanded={setExpanded}
              />
            ))}
          </Box>
        </Box>
      </Scrollbar>

      {slots?.bottomArea}

      <NavUpgrade />
    </>
  );
}
