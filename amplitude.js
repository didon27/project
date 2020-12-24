import amplitude_api_key from './environment';
const amplitude = require('amplitude-js');
amplitude.getInstance().init(amplitude_api_key);

export default amplitude;
