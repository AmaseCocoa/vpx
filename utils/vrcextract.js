const extractInfo = (fileName) => {
    // 新しい正規表現を追加（タイトル部分を抽出）
    const newRegex = /VRChat_(\d{4}-\d{2}-\d{2})_(\d{2}-\d{2}-\d{2}\.\d{3})_(\d+)x(\d+)(__.*)?/;
    const match = fileName.match(newRegex);

    if (match) {
        const creationDate = match[1];
        const time = match[2];
        const width = match[3];
        const height = match[4];
        const title = match[5] ? match[5].substring(2) : ''; // __以降の部分をタイトルとして取得

        const formattedDateString = `${creationDate}T${time.replace(/-/g, ':')}`;
        const date = new Date(formattedDateString + '+09:00');

        return {
            creationDate,
            time,
            width: parseInt(width, 10),
            height: parseInt(height, 10),
            date,
            title // タイトルを追加
        };
    } else {
        // 既存の処理を実行（旧形式）
        const regex = /VRChat_(\d{4}-\d{2}-\d{2})_(\d{2}-\d{2}-\d{2}\.\d{3})_(\d+)x(\d+)/;
        const existingMatch = fileName.match(regex);

        if (existingMatch) {
            const creationDate = existingMatch[1];
            const time = existingMatch[2];
            const width = existingMatch[3];
            const height = existingMatch[4];
            const title = null;

            const formattedDateString = `${creationDate}T${time.replace(/-/g, ':')}`;
            const date = new Date(formattedDateString + '+09:00');

            return {
                creationDate,
                time,
                width: parseInt(width, 10),
                height: parseInt(height, 10),
                date,
                title // タイトルを追加
            };
        } else {
            return null; // どちらの正規表現にもマッチしない場合
        }
    }
};

export default extractInfo;
