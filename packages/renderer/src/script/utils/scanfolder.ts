import { Stats } from "original-fs";

/**
 * 遍历文件夹并返回文件名称
 * @param currentDirPath 遍历地址
 * @param callback 回调参数
 */

export const walkSync = (
  currentDirPath: string,
  callback: (
    filePath: string,
    filename: string,
    filename_withoutsuffix: string,
    stat: Stats
  ) => void
) => {
  window.fs.readdirSync(currentDirPath).forEach(function (name) {
    var filePath = window.path.join(currentDirPath, name);
    var filename = name;
    var filename_withoutsuffix = name.replace(/\..*/g, "");
    var stat = window.fs.statSync(filePath);
    callback(filePath, filename, filename_withoutsuffix, stat);
  });
};

export const scan_allfiles = async (folderpath: string) => {
  const file_list: any[] = [];
  walkSync(folderpath, (filepath, name, w_name) => {
    if (w_name != "") {
      file_list.push({
        filepath: filepath,
        fullname: "",
        name: w_name,
      });
    }
  });

  file_list.forEach(async (file, index) => {
    window.fs.readFile(
      file.filepath,
      "utf8",
      (err, res) => {
        if (err) throw err;
        file_list[index]["fullname"] = JSON.parse(res).name;
      }
    );
  });

  return file_list;
};
