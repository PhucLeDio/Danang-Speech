import React, { useState, useEffect } from 'react';
import SwitchField from '../components/Switch';

function Options() {
  const [switchStates, setSwitchStates] = useState({
    safeLanguage: false,
    safeImages: false,
    educationalSupport: false,
  });

  useEffect(() => {
    // Load state from localStorage
    const savedState = JSON.parse(localStorage.getItem('switchStates'));
    if (savedState) {
      setSwitchStates(savedState);
    }
  }, []);

  const handleSwitchChange = (name) => {
    setSwitchStates((prevState) => {
      const newState = { ...prevState, [name]: !prevState[name] };
      localStorage.setItem('switchStates', JSON.stringify(newState));

      const action = newState[name] ? 'on' : 'off';
      // console.log(action)
      // console.log([name])

      switch (name) {
        case 'safeLanguage':
          console.log(`${action} language`);
          break;
        case 'safeImages':
          console.log(`${action} images`);
          break;
        case 'educationalSupport':
          console.log(`${action} support`);
          break;
        default:
          break;
      }

      return newState;
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
      <form>
        <div style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
          <SwitchField
            label="Ngôn ngữ an toàn cho trẻ em"
            checked={switchStates.safeLanguage}
            onChange={() => handleSwitchChange('safeLanguage')}
          />
          <SwitchField
            label="Hình ảnh an toàn cho trẻ em"
            checked={switchStates.safeImages}
            onChange={() => handleSwitchChange('safeImages')}
          />
          <SwitchField
            label="Hỗ trợ học tập cho trẻ em"
            checked={switchStates.educationalSupport}
            onChange={() => handleSwitchChange('educationalSupport')}
          />
        </div>
      </form>
    </div>
  );
}

export default Options;
