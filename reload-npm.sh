echo Version Number $1
npm pack
cd examples
cd ChatExample
npm install ../../react-native-chatflow-$1.tgz