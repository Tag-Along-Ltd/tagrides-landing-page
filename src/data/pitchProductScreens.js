export const pitchProductScreens = {
  searchDestination: '/assets/pitch/screen-search.png',
  confirmRide: '/assets/pitch/screen-confirm.png',
  negotiateFare: '/assets/pitch/screen-negotiate-real.png',
  trackRide: '/assets/pitch/screen-track-real.png',
};

export function resolvePitchProductScreen(flow) {
  return pitchProductScreens[flow.screen] ?? flow.image;
}
