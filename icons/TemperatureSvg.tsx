import IconProps from '@/typings/icons/IconProps'
import { twMerge } from 'tailwind-merge'
import React from 'react'

export default function TemperatureSvg({ className }: IconProps) {
  return (
    <svg viewBox='0 0 1024 1024' className={twMerge('size-12', className)} version='1.1' xmlns='http://www.w3.org/2000/svg' fill='currentColor'>
      <g strokeWidth='0'></g>
      <g strokeLinecap='round' strokeLinejoin='round'></g>
      <g>
        <path d='M547.95389 698.803636c26.236176 13.233775 44.155277 40.40371 44.035458 71.796224-0.115687 44.151145-36.189396 79.873661-80.340541 79.638156-44.155277-0.119819-79.873661-36.193527-79.638155-80.340541 0.115687-31.504069 18.390113-58.562449 44.853531-71.560719l2.342663-609.939437c0.119819-19.559379 16.163137-35.48701 35.722516-35.371322 19.555247 0.115687 35.48701 16.163137 35.48701 35.722515l-2.462482 610.055124z'></path>
        <path d='M539.054248 192.775981h177.782111v31.483411h-177.782111zM539.054248 370.558092h177.782111v31.48341h-177.782111zM539.054248 530.540919h177.782111v31.479279h-177.782111zM283.832037 804.425934c-29.173801 0.004132-59.934167-17.514197-70.040259-37.722249-6.982541-13.969214-37.759434-44.584972-83.711993-44.584972-46.026929 0-95.094774 48.212588-95.586445 48.700126l-22.224313-22.298683c2.367453-2.363322 58.694663-57.880722 117.810758-57.880722 58.921906 0 99.887525 38.01973 111.873532 61.983481 5.11089 10.221779 32.404776 25.389181 52.013734 18.815677 29.31841-9.771426 34.425168-15.365722 34.912707-15.968948-0.322271 0.400773-1.152739 1.933627-1.152739 4.197788h31.48341c0 19.266029-22.096231 30.578573-55.269499 41.634951-6.416501 2.148474-13.22138 3.123551-20.108893 3.123551zM913.025109 779.367288c-23.538188 0-46.361595-9.862323-61.871926-16.568042-5.561243-2.404638-10.81261-4.672931-14.803814-6.003332-12.824738-4.27629-24.120755-13.671733-36.073708-23.61669-17.059712-14.188193-34.693727-28.859793-56.736247-28.859793-39.676535 0-80.369463 24.20752-80.778499 24.451289l-16.229243-26.975747c1.96668-1.181661 48.687731-28.954822 97.007742-28.954821 33.425301 0 57.517134 20.038654 76.869929 36.139815 9.61029 7.994803 18.691726 15.547516 25.90151 17.952155 5.276157 1.760096 11.130749 4.288685 17.332402 6.970146 33.474881 14.469148 60.686133 23.509266 80.989215-1.86752l24.587635 19.666803c-16.729177 20.902175-36.709987 27.665737-56.194996 27.665737zM482.776619 1023.124084c-0.929628 0-1.855125-0.020658-2.780622-0.066107-25.14128-1.127949-47.791156-17.336534-69.209791-49.54299-21.154208-25.699057-39.697193-38.222183-55.335607-37.325608-13.126351 0.785019-26.88485 11.857925-40.932565 32.925368-1.512195 19.3404-11.936427 34.635883-29.743973 43.407443-26.318809 12.961084-66.792758 8.858324-90.231786-9.155806-13.378384-10.279623-19.898177-24.302549-18.237241-38.90391-6.255365-30.752103-23.158073-49.076109-46.654944-50.402379-26.521262-1.437825-60.256439 19.840333-73.38279 63.520467l-30.153009-9.052514c15.721047-52.331874 59.963089-88.438636 105.312422-85.897652 39.284025 2.218713 67.821547 31.648678 76.33281 78.725054l0.532987 2.95002-0.59083 2.937625c-0.309876 1.54938-1.132081 5.668667 6.015728 11.163803 14.117955 10.849795 41.349865 13.646943 57.132887 5.879382 8.436893-4.160603 12.366122-10.556445 12.366122-20.12955v-4.577903l2.45835-3.867254c20.848463-32.797285 43.05625-49.460356 67.891786-50.943629 26.736109-1.636146 53.554852 14.568308 82.071715 49.419039l0.954418 1.297348c15.394644 23.327472 30.471149 35.48701 44.808083 36.12742 15.411171 0.772624 33.160873-11.287753 52.910309-35.615092 18.757833-43.403311 52.943363-69.565116 89.740116-68.094238 36.334004 1.318006 66.619228 27.971482 81.014005 71.288028 6.428896 19.232976 24.777692 32.21885 44.465153 31.388382 19.972547-0.768493 34.883784-15.03932 40.920171-39.14768l0.735439-2.921098 1.760096-2.450087c34.97055-48.600966 67.916576-71.383056 101.131161-69.610565 31.16114 1.656804 59.070646 24.889248 85.310953 71.019468l-27.364124 15.568175c-20.232843-35.56138-40.296287-54.120892-59.624292-55.149681-20.811278-1.140344-45.076642 17.138214-72.213524 54.236579-11.911637 42.58937-43.461155 58.909511-69.445297 59.913509-33.5947 1.251899-64.710391-20.455954-75.543659-52.897914-10.089565-30.355462-29.636549-48.956291-52.290558-49.782627-23.827405-0.698254-47.03919 18.60496-60.421705 50.832074l-0.846995 2.045182-1.384113 1.731175c-26.339468 33.041055-51.720385 49.154611-77.477286 49.158743z'></path>
        <path
          d='M485.763824 828.69543c-52.852466 0-95.850872-42.948826-95.850872-95.735185 0-33.193927 16.824206-63.351068 44.502338-80.85287V51.344402c0-28.314411 22.980411-51.344402 51.228716-51.344402 28.363991 0 51.344402 23.034123 51.344402 51.344402V652.107375c27.682264 17.501802 44.502338 47.658943 44.502338 80.85287 0.004132 52.790491-42.936431 95.735185-95.726922 95.735185z m0-797.212019a19.848596 19.848596 0 0 0-19.860991 19.860991v619.690205l-8.726111 4.342397c-22.067309 10.990272-35.780359 33.057581-35.780359 57.587372 0 35.429166 28.872188 64.255906 64.367461 64.255906 35.425035 0 64.251774-28.82674 64.251775-64.255906 0-24.529791-13.708918-46.592969-35.780359-57.587372l-8.726111-4.342397V51.344402c0-10.953087-8.854193-19.860992-19.745305-19.860991z'
          fill='#332C2B'></path>
      </g>
    </svg>
  )
}