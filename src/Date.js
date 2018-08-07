/**
 * Created by steve on 22/12/15.
 */
import ComposedComponent from './ComposedComponent';
import NativeDateField from './NativeDateField'

export default ComposedComponent(NativeDateField, {type: 'date'});
