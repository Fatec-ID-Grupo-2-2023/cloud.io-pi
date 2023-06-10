import { Box, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import Arrow from '../../assets/up-arrow.svg';
import useGlobalContext from '../../contexts/useGlobalContext';
import { ILanguage } from '../../models/general';
import './style.scss';

export default function Settings() {
  const { t } = useTranslation();
  const history = useHistory();
  const { language, setLanguage } = useGlobalContext();
  // const [theme, toggleTheme] = useToggle('dark', 'light');

  const languages = ['pt', 'en', 'es', 'fr', 'de', 'it'];

  return (
    <Box id='settings'>
      <Box id='header'>
        <IconButton id='back' onClick={history.goBack}>
          <img src={Arrow} alt='' />
        </IconButton>
        <Typography id='page-title'>{t('Settings')}</Typography>
      </Box>
      <section id='categories'>
        <Paper elevation={1} className='category'>
          <FormControl fullWidth>
            <InputLabel id='language'>{t('Language')}</InputLabel>
            <Select
              labelId='language'
              id='language-select'
              value={language}
              label={t('Language')}
              onChange={({ target: { value } }) => setLanguage(value as ILanguage)}
            >
              {languages.map((lang, index) => (
                <MenuItem key={index} value={lang}>
                  {t(lang)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* <Divider />
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 8px 8px 8px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <img src={ThemeIcon} alt='' width={30} height={30} />
              <Typography className='category-title'>{t('DarkTheme')}</Typography>
            </Box>
            <Switch checked={theme === 'dark' ? true : false} onChange={toggleTheme} uncheckedIcon={false} checkedIcon={false} />
          </Box> */}
        </Paper>
      </section>
    </Box>
  );
}
