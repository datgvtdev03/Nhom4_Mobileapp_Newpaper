const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts },
    transformer: { assetPlugins },
  } = await getDefaultConfig();

  return {
    resolver: {
      sourceExts: [...sourceExts, 'jsx', 'js', 'ts', 'tsx'], // Thêm các phần mở rộng tệp của bạn nếu cần thiết
    },
    transformer: {
      assetPlugins: [...assetPlugins, 'expo-asset/tools/hashAssetFiles'],
    },
  };
})();
