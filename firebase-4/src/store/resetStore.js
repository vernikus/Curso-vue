// Este composable es solo para cuando se usan tiendas con la configuracion de funciones, ya que no se puede acceder directamente al .$reset()
import cloneDeep from 'lodash.clonedeep'

export default function storeReset({ store }) {
  const initialState = cloneDeep(store.$state)
  store.$reset = () => store.$patch(cloneDeep(initialState))
}