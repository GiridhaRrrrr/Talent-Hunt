import React from 'react';
import { MainLayout } from '../components/layout';
import { ExtensionInfo } from '../components/extentionServices';
import { DownloadSection } from '../components/extentionServices';
import { UsageGuide } from '../components/extentionServices';

const ExtensionPage = () => {
  return (
    <MainLayout>
      <ExtensionInfo />
      <DownloadSection />
      <UsageGuide />
    </MainLayout>
  );
};

export default ExtensionPage;