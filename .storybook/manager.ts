import logo from './media/logo.png';

const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
if (favicon) {
  favicon.type = 'image/png';
  favicon.href = logo;
}
