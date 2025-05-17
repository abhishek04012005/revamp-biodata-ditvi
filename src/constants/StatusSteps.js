export const STATUS_STEPS = [
    { id: 0, label: 'Request Received', icon: '📝' , color: '#FF870F' },
    { id: 1, label: 'Sample Shared & In Review', icon: '👀', color: '#2196F3'},
    { id: 2, label: 'Approved by User', icon: '✅' , color: '#9C27B0' },
    { id: 3, label: 'Payment Confirmed', icon: '💳', color: '#FF9800' },
    { id: 4, label: 'Request Fulfilled', icon: '🎉', color: '#4CAF50' },
];

export const MOVE_FORWARD = 1;
export const MOVE_BACKWARD = -1;

export default STATUS_STEPS;
