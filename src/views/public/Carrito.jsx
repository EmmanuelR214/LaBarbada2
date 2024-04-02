import { Icon } from "@iconify/react";
import { ButtonCount2 } from "../../components/Buttons";
import { ButtonBasic } from "../../components/Buttons"

import { motion } from "framer-motion";

const Carrito = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mt-24 mb-8 text-center">Carrito</h1>

      <div className="relative overflow-x-auto m-12">
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="text-lg text-white bg-zinc-800">
            <tr>
              <th className="px-6 py-3">Platillo</th>
              <th className="py-1 text-center w-24">Cantidad</th>
              <th className="text-center w-24">Subtotal</th>
              <th className="px-6 py-3 w-96 text-red-600 text-center">Cancelar</th>
            </tr>
          </thead>

          <tbody>
            <tr className="bg-zinc-700 border-b dark:border-gray-500">
              <th className="px-6 py-4 font-medium whitespace-nowrap">
                <img
                  src="/img/camarones.jpg"
                  className="inline-block align-middle mr-2 w-28 h-20 rounded-xl"
                  alt="Camarones para pelar"
                />
                Camarones para pelar
              </th>
              <td className="py-4 flex justify-center">
                <ButtonCount2 />
              </td>
              <td className="text-center">$120</td>
              <td className="flex justify-center">
              <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}><Icon icon="mdi:trash-outline" className="text-3xl" />
                  </motion.button>
              </td>
            </tr>

            <tr className="bg-zinc-700 border-b dark:border-gray-500">
              <th className="px-6 py-4 font-medium whitespace-nowrap">
                <img
                  src="/img/camarones.jpg"
                  className="inline-block align-middle mr-2 w-28 h-20 rounded-xl"
                  alt="Pulpo a la diabla"
                />
                Pulpo a la diabla
              </th>
              <td className="py-4 flex justify-center">
                <ButtonCount2 />
              </td>
              <td className="text-center">$130</td>
              <td className="flex justify-center">
              <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}><Icon icon="mdi:trash-outline" className="text-3xl" />
                  </motion.button>
              </td>
            </tr>

            <tr className="bg-zinc-700 border-b dark:border-gray-500">
              <th className="px-6 py-4 font-medium whitespace-nowrap">
                <img
                  src="/img/camarones.jpg"
                  className="inline-block align-middle mr-2 w-28 h-20 rounded-xl"
                  alt="Torre de mariscos"
                />
                Torre de mariscos
              </th>
              <td className="py-4 flex justify-center">
                <ButtonCount2 />
              </td>
              <td className="text-center">$230</td>
              <td className="flex justify-center">
              <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}><Icon icon="mdi:trash-outline" className="text-3xl" />
                  </motion.button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ButtonBasic text='Confirmar pedido' textColor="text-slate-800" color="bg-blue-500" hovColor="hover:bg-blue-400"  />
    </div>
  );
};

export default Carrito;


/*<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th  class="px-6 py-3">
                    Product name
                </th>
                <th scope="col" class="px-6 py-3">
                    Color
                </th>
                <th scope="col" class="px-6 py-3">
                    Category
                </th>
                <th scope="col" class="px-6 py-3">
                    Price
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium  whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4">
                    Silver
                </td>
                <td class="px-6 py-4">
                    Laptop
                </td>
                <td class="px-6 py-4">
                    $2999
                </td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td class="px-6 py-4">
                    White
                </td>
                <td class="px-6 py-4">
                    Laptop PC
                </td>
                <td class="px-6 py-4">
                    $1999
                </td>
            </tr>
            <tr class="bg-white dark:bg-gray-800">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Magic Mouse 2
                </th>
                <td class="px-6 py-4">
                    Black
                </td>
                <td class="px-6 py-4">
                    Accessories
                </td>
                <td class="px-6 py-4">
                    $99
                </td>
            </tr>
        </tbody>
    </table>
</div>*/
