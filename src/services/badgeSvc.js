import store from '../store';

let lastEarnedFeatureIds = null;
let debounceTimeoutId;

const showInfo = () => {
  const earnedBadges = store.getters['data/allBadges']
    .filter(badge => badge.isEarned && !lastEarnedFeatureIds.has(badge.featureId));
  if (earnedBadges.length) {
    store.dispatch('notification/badge', earnedBadges.length > 1
      ? `You've earned ${earnedBadges.length} badges: ${earnedBadges.map(badge => `"${badge.name}"`).join(', ')}.`
      : `You've earned 1 badge: "${earnedBadges[0].name}".`);
  }
  lastEarnedFeatureIds = null;
};

export default {
  addBadge(featureId) {
    if (!store.getters['data/badgeCreations'][featureId]) {
      if (!lastEarnedFeatureIds) {
        const earnedFeatureIds = store.getters['data/allBadges']
          .filter(badge => badge.isEarned)
          .map(badge => badge.featureId);
        lastEarnedFeatureIds = new Set(earnedFeatureIds);
      }

      store.dispatch('data/patchBadgeCreations', {
        [featureId]: {
          created: Date.now(),
        },
      });

      clearTimeout(debounceTimeoutId);
      debounceTimeoutId = setTimeout(() => showInfo(), 5000);
    }
  },
};
