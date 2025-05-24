// export const FlowType = {
//   FLOW_WHATSAPP: 1,
//   FLOW_UPLOAD_BIODATA: 2,
//   FLOW_CREATE_BIODATA: 3,
// }

// const FLOW_TYPE_BY_ID = {
//   [FlowType.FLOW_WHATSAPP]: 'WhatsApp',
//   [FlowType.FLOW_UPLOAD_BIODATA]: 'Upload Biodata',
//   [FlowType.FLOW_CREATE_BIODATA]: 'Create Biodata',
// }

// export const getFlowTypeById = (id) => FLOW_TYPE_BY_ID[id] || 'Unknown Flow Type';

export const FlowType = {
  FLOW_WHATSAPP: 1,
  FLOW_UPLOAD_BIODATA: 2,
  FLOW_CREATE_BIODATA: 3,
}

const FLOW_TYPE_BY_ID = {
  [FlowType.FLOW_WHATSAPP]: {
    label: 'WhatsApp',
    style: {
      color: '#25D366',
      backgroundColor: '#dcf8c6',
      padding: '4px 12px',
      borderRadius: '12px',
      fontSize: '0.875rem',
      fontWeight: '500'
    }
  },
  [FlowType.FLOW_UPLOAD_BIODATA]: {
    label: 'Upload Biodata',
    style: {
      color: '#ff6b00',
      backgroundColor: '#fff3e6',
      padding: '4px 12px',
      borderRadius: '12px',
      fontSize: '0.875rem',
      fontWeight: '500'
    }
  },
  [FlowType.FLOW_CREATE_BIODATA]: {
    label: 'Create Biodata',
    style: {
      color: '#8b5cf6',
      backgroundColor: '#f3e8ff',
      padding: '4px 12px',
      borderRadius: '12px',
      fontSize: '0.875rem',
      fontWeight: '500'
    }
  }
}

export const getFlowTypeById = (id) => FLOW_TYPE_BY_ID[id]?.label || 'Unknown Flow Type';
export const getFlowTypeStyle = (id) => FLOW_TYPE_BY_ID[id]?.style || {};