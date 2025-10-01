import React from 'react';
import { Armchair } from 'lucide-react';
import { clsx } from 'clsx';
import type { Seat } from '../../types';

interface SeatMapProps {
  seats: Seat[];
  selectedSeats: string[];
  onSeatSelect: (seatId: string) => void;
  maxSeats?: number;
}

const SeatMap: React.FC<SeatMapProps> = ({
  seats,
  selectedSeats,
  onSeatSelect,
  maxSeats = 8,
}) => {
  const getSeatClasses = (seat: Seat) => {
    const isSelected = selectedSeats.includes(seat.id);
    const isAvailable = seat.status === 'available';
    const isOccupied = seat.status === 'occupied';
    const isBlocked = seat.status === 'blocked';

    return clsx(
      'w-8 h-8 rounded text-xs font-medium transition-all duration-200 flex items-center justify-center border-2',
      {
        // Available seats
        'bg-gray-200 border-gray-300 text-gray-700 hover:bg-blue-100 hover:border-blue-300 cursor-pointer': 
          isAvailable && !isSelected,
        
        // Selected seats
        'bg-blue-600 border-blue-700 text-white': isSelected,
        
        // Occupied seats
        'bg-red-500 border-red-600 text-white cursor-not-allowed': isOccupied,
        
        // Blocked seats
        'bg-gray-500 border-gray-600 text-white cursor-not-allowed': isBlocked,
      }
    );
  };

  const handleSeatClick = (seat: Seat) => {
    if (seat.status !== 'available') return;
    
    if (selectedSeats.includes(seat.id)) {
      onSeatSelect(seat.id);
    } else if (selectedSeats.length < maxSeats) {
      onSeatSelect(seat.id);
    }
  };

  // Group seats by row
  const seatsByRow = seats.reduce((acc, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {} as Record<string, Seat[]>);

  // Sort rows alphabetically
  const sortedRows = Object.keys(seatsByRow).sort();

  return (
    <div className="max-w-4xl mx-auto">
      {/* Screen */}
      <div className="text-center mb-8">
        <div className="inline-block bg-gray-100 px-8 py-2 rounded-full shadow-sm">
          <span className="text-gray-600 text-sm font-medium">MÀN HÌNH</span>
        </div>
      </div>

      {/* Seat Map */}
      <div className="max-w-2xl mx-auto mb-6">
        {sortedRows.map((row) => {
          const rowSeats = seatsByRow[row].sort((a, b) => a.number - b.number);
          return (
            <div key={row} className="flex items-center justify-center mb-2">
              {/* Row Label (left) */}
              <div className="w-6 text-center text-sm font-medium text-gray-600 mr-2">
                {row}
              </div>

              {/* Seats */}
              <div className="flex gap-1 justify-center">
                {rowSeats.map((seat, index) => (
                  <React.Fragment key={seat.id}>
                    <button
                      onClick={() => handleSeatClick(seat)}
                      disabled={seat.status !== 'available' && !selectedSeats.includes(seat.id)}
                      className={getSeatClasses(seat)}
                      title={`Ghế ${seat.row}${seat.number} - ${
                        seat.status === 'available' ? 'Có thể chọn' :
                        seat.status === 'occupied' ? 'Đã đặt' : 'Không khả dụng'
                      }`}
                    >
                      {seat.number}
                    </button>
                    {/* Add aisle space after every 4 seats */}
                    {(index + 1) % 4 === 0 && index < rowSeats.length - 1 && (
                      <div className="w-4" />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Row Label (right) */}
              <div className="w-6 text-center text-sm font-medium text-gray-600 ml-2">
                {row}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 flex-wrap mb-4">
        <div className="flex items-center gap-2">
          <Armchair className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">Có thể chọn</span>
        </div>
        <div className="flex items-center gap-2">
          <Armchair className="h-4 w-4 text-blue-600" />
          <span className="text-sm text-gray-600">Đã chọn</span>
        </div>
        <div className="flex items-center gap-2">
          <Armchair className="h-4 w-4 text-red-500" />
          <span className="text-sm text-gray-600">Đã đặt</span>
        </div>
        <div className="flex items-center gap-2">
          <Armchair className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">Không khả dụng</span>
        </div>
      </div>

      {/* Selection Info */}
      {selectedSeats.length > 0 && (
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Đã chọn {selectedSeats.length}/{maxSeats} ghế
          </p>
        </div>
      )}
    </div>
  );
};

export default SeatMap;
