import {observable} from '@legendapp/state'
import {ObservablePersistMMKV} from '@legendapp/state/persist-plugins/mmkv'
import {configureObservableSync} from '@legendapp/state/sync'

configureObservableSync({
  persist: {
    plugin: ObservablePersistMMKV,
  },
})

const toast = observable<any>()

const Store = {
  toast,
}

export default Store
