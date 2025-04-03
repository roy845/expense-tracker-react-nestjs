import MainLayout from "../layout/MainLayout";
import { FaMoneyBillWave, FaPalette } from "react-icons/fa";
import { CURRENCIES } from "../constants/settingsConstants";
import SettingsHeader from "../components/settings/SettingsHeader";
import SettingsSection from "../components/settings/SettingsSection";
import CurrencySelector from "../components/settings/CurrencySelector";
import ThemeSelector from "../components/settings/ThemeSelector";
import useSettings from "../hooks/useSettings";

const Settings = () => {
  const {
    handleCurrencyChange,
    handleThemeChange,
    isCurrencyOpen,
    isDarkMode,
    isThemeOpen,
    loadingCurrency,
    selectedCurrency,
    setIsCurrencyOpen,
    setIsThemeOpen,
  } = useSettings();

  return (
    <MainLayout title="Settings">
      <SettingsHeader isDarkMode={isDarkMode} />

      {/* Currency Settings */}
      <SettingsSection
        title="Select Currency"
        icon={<FaMoneyBillWave />}
        isOpen={isCurrencyOpen}
        toggleOpen={() => setIsCurrencyOpen((prev) => !prev)}
        isDarkMode={isDarkMode}
      >
        <CurrencySelector
          currencies={CURRENCIES}
          selectedCurrency={selectedCurrency}
          loading={loadingCurrency}
          isDarkMode={isDarkMode}
          onChange={handleCurrencyChange}
        />
      </SettingsSection>

      {/* Theme Settings */}
      <SettingsSection
        title="Theme Settings"
        icon={<FaPalette />}
        isOpen={isThemeOpen}
        toggleOpen={() => setIsThemeOpen((prev) => !prev)}
        isDarkMode={isDarkMode}
      >
        <ThemeSelector isDarkMode={isDarkMode} onChange={handleThemeChange} />
      </SettingsSection>
    </MainLayout>
  );
};

export default Settings;
