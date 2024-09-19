import config from 'configs/app';

const semanticTokens = {
  colors: {
    divider: {
      'default': config.UI.theme.dividerColor,
      _dark: config.UI.theme.dividerDarkColor,
    },
    text: {
      'default': config.UI.theme.textColor,
      _dark: config.UI.theme.textDarkColor,
    },
    text_secondary: {
      'default': config.UI.theme.textSecondaryColor,
      _dark: config.UI.theme.textSecondaryDarkColor,
    },
    link: {
      'default': config.UI.theme.linkColor,
      _dark: config.UI.theme.linkDarkColor,
    },
    link_hovered: {
      'default': config.UI.theme.linkHoverColor,
      _dark: config.UI.theme.linkHoverDarkColor,
    },
    icon_link_external: {
      'default': 'gray.300',
      _dark: 'gray.500',
    },
    icon_info: {
      'default': 'gray.400',
      _dark: 'gray.500',
    },
    error: {
      'default': config.UI.theme.errorColor,
      _dark: config.UI.theme.errorDarkColor,
    },
    dialog_bg: {
      'default': 'white',
      _dark: 'gray.900',
    },
  },
  shadows: {
    action_bar: '0 4px 4px -4px rgb(0 0 0 / 10%), 0 2px 4px -4px rgb(0 0 0 / 6%)',
  },
};

export default semanticTokens;
