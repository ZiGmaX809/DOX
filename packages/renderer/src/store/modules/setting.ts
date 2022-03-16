import { defineStore } from 'pinia';

interface SettingState {
  first_launch: boolean;
  ui_color: string;
  org_code: number;
  custom_avatar_bool: boolean;
  custom_avatar_url: string;
  auto_int2em: boolean;
  editor_font_name: string;
  editor_font_size: string;
  clipboard_bool: boolean;
  clipboard_num: number;
  clipboard_textlength: number;
  writeSystemClipboard_bool: boolean;
  exportfile_path: string;
  class_year_bool: boolean;
  class_year_type: string;
  class_caseid_bool: boolean;
  offline_bool: boolean;
  offline_time: string;
  offline_timestamp: number;
  lawfilelist: string[];
}

export const STORE_Setting = defineStore({
  id: 'Setting',
  state: (): SettingState => {
    return {
      first_launch: true,
      ui_color: '',
      org_code: 1301,
      custom_avatar_bool: false,
      custom_avatar_url: '',
      auto_int2em: true,
      editor_font_name: '系统字体=',
      editor_font_size: '16px',
      clipboard_bool: false,
      clipboard_num: 50,
      clipboard_textlength: 300,
      writeSystemClipboard_bool: false,
      exportfile_path: '',
      class_year_bool: false,
      class_year_type: '案号年度',
      class_caseid_bool: false,
      offline_bool: false,
      offline_time: '从未',
      offline_timestamp: 0,
      lawfilelist: [],
    };
  },
  actions: {
    Switch_clipboard_bool(bool: boolean) {
      this.clipboard_bool = bool;
    },
    Change_clipboard_num(num: number) {
      this.clipboard_num = num;
    },
    Change_clipboard_textlength(num: number) {
      this.clipboard_textlength = num;
    },
    Change_org_code(num: number) {
      this.org_code = num;
    },
    Set_font_name(str: string) {
      this.editor_font_name = str;
    },
    Set_font_size(str: string) {
      this.editor_font_size = str;
    },
    Switch_auto_int2em(bool: boolean) {
      this.auto_int2em = bool;
    },
    Switch_custom_avatar(bool: boolean) {
      this.custom_avatar_bool = bool;
    },
    Change_lawfilelist(list: any[]) {
      this.lawfilelist = list;
    },
    Switch_writeSystemClipboard_bool(bool: boolean) {
      this.writeSystemClipboard_bool = bool;
    },
    Set_exportfile_path(path: string) {
      this.exportfile_path = path;
    },
    Switch_class_year_bool(bool: boolean) {
      this.class_year_bool = bool;
    },
    Set_class_year_type(str: string) {
      this.class_year_type = str;
    },
    Switch_class_caseid_bool(bool: boolean) {
      this.class_caseid_bool = bool;
    },
    Switch_offline_bool(bool: boolean) {
      this.offline_bool = bool;
    },
    Set_offline_time() {
      const date = new Date();
      this.offline_time =
        date.toLocaleDateString() +
        ` ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}:${date
          .getSeconds()
          .toString()
          .padStart(2, '0')}`;
      this.offline_timestamp = date.getTime();
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'SettingConfig',
        storage: localStorage,
      },
    ],
  },
});
