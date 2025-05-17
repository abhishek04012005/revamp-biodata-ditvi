import STATUS_STEPS from "../constants/StatusSteps";


const DefaultStatusText = STATUS_STEPS[0].label;
const DefaultStatusId = STATUS_STEPS[0].id;

export const getLatestStatusText = (statusArray) => {
    if (!Array.isArray(statusArray) || statusArray.length === 0) {
        return DefaultStatusText;
    }

    const latestStatus = statusArray.reduce((latest, current) => {
        return (current.id > latest.id) ? current : latest;
    });

    return STATUS_STEPS[latestStatus.id].label || DefaultStatusText;
};

export const getLatestStatusId = (statusArray) => {
    if (!Array.isArray(statusArray) || statusArray.length === 0) {
        return DefaultStatusId;
    }

    const latestStatus = statusArray.reduce((latest, current) => {
        return (current.id > latest.id) ? current : latest;
    });

    return STATUS_STEPS[latestStatus.id].id || DefaultStatusId;
};

export const getStatusLabel = (statusId) => {
    const status = STATUS_STEPS.find(step => step.id === statusId);
    return status ? status.label : 'Unknown Status';
}

export const getStatusIcon = (statusId) => {
    const status = STATUS_STEPS.find(step => step.id === statusId);
    return status ? status.icon : '❓';
}

export const getStatusColor = (statusId) => {
    const status = STATUS_STEPS.find(step => step.id === statusId);
    return status ? status.color : '#000000';
}       

export const getStatusStyle = (statusId) => ({
        backgroundColor: `${STATUS_STEPS.find(step => step.id === statusId).color}20`,
        color: STATUS_STEPS.find(step => step.id === statusId).color,
        padding: '0.5rem 1rem',
        borderRadius: '20px',
        fontWeight: '500',
        fontSize: '0.9rem',
        display: 'inline-block'
});