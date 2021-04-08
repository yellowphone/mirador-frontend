// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TSFixMe = any;

export type LatLng = {
  lat: number;
  lng: number;
};

declare global {
  interface Window {
    gapi: TSFixMe;
  }
}
