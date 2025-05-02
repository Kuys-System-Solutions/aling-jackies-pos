import '../../App.css';
import logo from '/logo.png';

export default function OrderHistory() {
  return (
    <>
      <header className="kitchen-header">
        <div className="logo">
          <img src={logo} alt="Aling Jackie's Logo" />
        </div>
      </header>
      <div class="max-w-screen-xl mx-auto my-5 px-5 text-black font-sans">
        <header class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-5 border-b-2 border-neutral-700">
          <h1 class="text-2xl font-semibold">Order History</h1>
          <div class="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
            <button
              id="exportButton"
              class="bg-green-600 hover:bg-green-700 hover:-translate-y-0.5 transition text-black px-6 py-3 rounded-lg"
            >
              Export
            </button>
            <button
              id="resetFilters"
              class="bg-red-600 hover:bg-red-700 hover:-translate-y-0.5 transition text-black px-6 py-3 rounded-lg"
            >
              Reset Filters
            </button>
            <a
              href="/"
              class="bg-green-600 hover:bg-green-700 hover:-translate-y-0.5 transition text-black px-6 py-3 rounded-lg text-center"
            >
              Back to POS
            </a>
          </div>
        </header>

        <div class="flex flex-col gap-4 mb-6">
          <div class="bg-neutral-400 p-6 rounded-2xl shadow-md">
            <div class="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6">
              <div class="flex flex-col lg:flex-row gap-6 w-full">
                <div class="flex flex-col gap-2">
                  <label class="text-sm text-gray-800">Date Range:</label>
                  <div class="flex flex-col sm:flex-row items-center gap-3">
                    <input
                      type="date"
                      id="startDate"
                      class="bg-neutral-200 border border-neutral-600 text-black px-3 py-2 rounded-md focus:ring-2 focus:ring-green-500"
                    />
                    <span class="text-gray-800">to</span>
                    <input
                      type="date"
                      id="endDate"
                      class="bg-neutral-200 border border-neutral-600 text-black px-3 py-2 rounded-md focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
                <div class="flex flex-col gap-2">
                  <label class="text-sm text-gray-800">Time Range:</label>
                  <div class="flex flex-col sm:flex-row items-center gap-3">
                    <input
                      type="time"
                      id="startTime"
                      class="bg-neutral-200 border border-neutral-600 text-black px-3 py-2 rounded-md focus:ring-2 focus:ring-green-500"
                    />
                    <span class="text-gray-800">to</span>
                    <input
                      type="time"
                      id="endTime"
                      class="bg-neutral-200 border border-neutral-600 text-black px-3 py-2 rounded-md focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>
              <button
                id="applyDateFilter"
                class="bg-green-600 hover:bg-green-700 hover:-translate-y-0.5 transition text-black px-6 py-3 rounded-lg"
              >
                Apply Range
              </button>
            </div>
          </div>

          <div class="bg-neutral-400 p-6 rounded-2xl shadow-md">
            <div class="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6">
              <div class="flex flex-col lg:flex-row gap-6 w-full">
                <div class="flex flex-col gap-2">
                  <label class="text-sm text-gray-800">Sort by:</label>
                  <select
                    id="sortBy"
                    class="bg-neutral-200 border border-neutral-600 text-black px-3 py-2 rounded-md focus:ring-2 focus:ring-green-500"
                  >
                    <option value="date">Date</option>
                    <option value="dailyCustomerNumber">
                      Daily Customer Number
                    </option>
                    <option value="monthlyCustomerNumber">
                      Monthly CustomerNumber
                    </option>
                    <option value="totalAmount">Total Amount</option>
                  </select>
                </div>
                <div class="flex flex-col gap-2">
                  <label class="text-sm text-gray-800">Order:</label>
                  <select
                    id="sortOrder"
                    class="bg-neutral-200 border border-neutral-600 text-black px-3 py-2 rounded-md focus:ring-2 focus:ring-green-500"
                  >
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                  </select>
                </div>
              </div>
              <button
                id="applySort"
                class="bg-green-600 hover:bg-green-700 hover:-translate-y-0.5 transition text-black px-6 py-3 rounded-lg"
              >
                Apply Sort
              </button>
            </div>
          </div>
        </div>

        <div class="bg-neutral-400 p-6 rounded-2xl shadow-md overflow-x-auto">
          <table class="w-full border-separate border-spacing-y-2 min-w-[900px]">
            <thead>
              <tr>
                <th class="bg-neutral-200 text-gray-800 uppercase text-xs font-medium px-4 py-3 text-left rounded-tl-lg">
                  Daily Customer #
                </th>
                <th class="bg-neutral-200 text-gray-800 uppercase text-xs font-medium px-4 py-3 text-left">
                  Date
                </th>
                <th class="bg-neutral-200 text-gray-800 uppercase text-xs font-medium px-4 py-3 text-left">
                  Time
                </th>
                <th class="bg-neutral-200 text-gray-800 uppercase text-xs font-medium px-4 py-3 text-left w-[40%]">
                  Order Details
                </th>
                <th class="bg-neutral-200 text-gray-800 uppercase text-xs font-medium px-4 py-3 text-left">
                  Original Total
                </th>
                <th class="bg-neutral-200 text-gray-800 uppercase text-xs font-medium px-4 py-3 text-left">
                  Discounted Total
                </th>
                <th class="bg-neutral-200 text-gray-800 uppercase text-xs font-medium px-4 py-3 text-left rounded-tr-lg">
                  Monthly Customer #
                </th>
              </tr>
            </thead>
            <tbody id="ordersList"></tbody>
          </table>
        </div>
      </div>
    </>
  );
}
