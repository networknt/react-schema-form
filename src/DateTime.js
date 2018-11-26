import ComposedComponent from "./ComposedComponent";
import NativeDateField from "./NativeDateField";

export default ComposedComponent(NativeDateField, { type: "datetime-local" });
