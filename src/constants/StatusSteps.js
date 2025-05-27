export const STATUS_STEPS = [
  { id: 0, label: "Request Received", icon: "📝", color: "#FF870F" },
  { id: 1, label: "Work in progress", icon: "⚡", color: "#FFC107" },
  { id: 2, label: "Sample Shared & In Review", icon: "👀", color: "#2196F3" },
  { id: 3, label: "Approved by User", icon: "✅", color: "#9C27B0" },
  { id: 4, label: "Payment Confirmed", icon: "💳", color: "#FF9800" },
  { id: 5, label: "Request Fulfilled", icon: "🎉", color: "#4CAF50" },
  { id: 6, label: "Feedback Received", icon: "⭐", color: "#8BC34A" },
];

export const MOVE_FORWARD = 1;
export const MOVE_BACKWARD = -1;

export default STATUS_STEPS;
