import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ChatbotWidget from './ChatbotWidget';
import VoicebotWidget from './VoicebotWidget';

export default () => (
  <Tabs>
    <TabList>
      <Tab>CHAT</Tab>
      <Tab>VOICE</Tab>
    </TabList>

    <TabPanel>
      <ChatbotWidget />
    </TabPanel>
    <TabPanel>
      <VoicebotWidget />
    </TabPanel>
  </Tabs>
);