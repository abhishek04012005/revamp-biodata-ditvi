export const FlowType = {
  FLOW_WHATSAPP: 1,
  FLOW_UPLOAD_BIODATA: 2,
  FLOW_CREATE_BIODATA: 3,
}

const FLOW_TYPE_BY_ID = {
  [FlowType.FLOW_WHATSAPP]: 'WhatsApp',
  [FlowType.FLOW_UPLOAD_BIODATA]: 'Upload Biodata',
  [FlowType.FLOW_CREATE_BIODATA]: 'Create Biodata',
}

export const getFlowTypeById = (id) => FLOW_TYPE_BY_ID[id] || 'Unknown Flow Type';