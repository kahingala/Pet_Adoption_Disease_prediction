// src/features/campaigns/campaignSelectors.js
export const selectCampaigns = (state) => state.campaigns.campaigns;
export const selectCampaignsLoading = (state) => state.campaigns.loading;
export const selectCampaignsError = (state) => state.campaigns.error;
export const selectSelectedCampaign = (state) => state.campaigns.selectedCampaign;