const initialState = {
    campaigns: [],
    loading: false,
    error: null,
  };
  
  const campaignReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'DELETE_CAMPAIGN_REQUEST':
        return { ...state, loading: true, error: null };
      case 'DELETE_CAMPAIGN_SUCCESS':
        return {
          ...state,
          loading: false,
          campaigns: state.campaigns.filter((campaign) => campaign._id !== action.payload),
        };
      case 'DELETE_CAMPAIGN_FAILURE':
        return { ...state, loading: false, error: action.payload };
      // ... other action types ...
      case 'UPDATE_CAMPAIGN_REQUEST':
        return { ...state, loading: true, error: null };
      case 'UPDATE_CAMPAIGN_SUCCESS':
        return {
          ...state,
          loading: false,
          campaigns: state.campaigns.map((campaign) =>
            campaign._id === action.payload._id ? action.payload : campaign
          ),
        };
      case 'UPDATE_CAMPAIGN_FAILURE':
        return { ...state, loading: false, error: action.payload };
     
      default:
        return state;
    }
  };
  
  export default campaignReducer;