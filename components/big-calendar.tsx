"use client";

import React, { useState, useEffect } from "react";
import { CalendarDate, today, getLocalTimeZone } from "@internationalized/date";
import { Button, ButtonGroup } from "@heroui/button";
import { useLocale } from "@react-aria/i18n";

type BigCalendarProps = {
  value?: CalendarDate;
  onChange?: (date: CalendarDate) => void;
};

const BigCalendar: React.FC<BigCalendarProps> = ({ value, onChange }) => {
  const [currentMonth, setCurrentMonth] = useState<CalendarDate | null>(null);
  const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(null);
  const [monthName, setMonthName] = useState<string>("");
  const [weekDays, setWeekDays] = useState<string[]>([]);

  useEffect(() => {
    const initialDate = value ?? today(getLocalTimeZone());

    setCurrentMonth(new CalendarDate(initialDate.year, initialDate.month, 1));
    setSelectedDate(initialDate);
    setMonthName(
      new Date(
        Date.UTC(initialDate.year, initialDate.month - 1),
      ).toLocaleString("es-ES", { month: "long", timeZone: "UTC" }),
    );
    setWeekDays(
      Array.from({ length: 7 }, (_, i) =>
        new Date(1970, 0, 4 + i).toLocaleDateString("es-ES", {
          weekday: "short",
          timeZone: "UTC",
        }),
      ),
    );
  }, [value]);

  if (!currentMonth || !selectedDate) {
    return null;
  }

  const getDaysInMonth = (year: number, month: number) =>
    new Date(year, month, 0).getDate();

  const updateMonthView = (date: CalendarDate) => {
    setCurrentMonth(new CalendarDate(date.year, date.month, 1));
    setMonthName(
      new Date(Date.UTC(date.year, date.month - 1)).toLocaleString("es-ES", {
        month: "long",
        timeZone: "UTC",
      }),
    );
  };

  const handlePreviousMonth = () => {
    const prevMonth =
      currentMonth.month === 1
        ? new CalendarDate(currentMonth.year - 1, 12, 1)
        : new CalendarDate(currentMonth.year, currentMonth.month - 1, 1);

    updateMonthView(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth =
      currentMonth.month === 12
        ? new CalendarDate(currentMonth.year + 1, 1, 1)
        : new CalendarDate(currentMonth.year, currentMonth.month + 1, 1);

    updateMonthView(nextMonth);
  };

  const handleToday = () => {
    const todayDate = today(getLocalTimeZone());

    setSelectedDate(todayDate);
    updateMonthView(todayDate);
    onChange && onChange(todayDate);
  };

  const handleDateClick = (day: number) => {
    const selected = new CalendarDate(
      currentMonth.year,
      currentMonth.month,
      day,
    );

    setSelectedDate(selected);
    onChange && onChange(selected);
  };

  const daysInMonth = getDaysInMonth(currentMonth.year, currentMonth.month);
  const startDay = new Date(
    currentMonth.year,
    currentMonth.month - 1,
    1,
  ).getDay();

  return (
    <div className="max-w-4xl p-6 mx-auto rounded-lg shadow-lg bg-content1">
      <ButtonGroup
        fullWidth
        className="mb-5 bg-content1 [&>button]:text-content1-foreground"
        color="default"
        radius="full"
        variant="bordered"
      >
        <Button onPress={handlePreviousMonth}>Mes anterior</Button>
        <Button onPress={handleToday}>Hoy</Button>
        <Button onPress={handleNextMonth}>Próximo mes</Button>
      </ButtonGroup>
      <div className="flex items-center justify-center mb-4">
        <h2 className="text-xl font-semibold capitalize">
          {monthName} {currentMonth.year}
        </h2>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {weekDays.map((day) => (
          <div
            key={day}
            className="font-medium capitalize text-content1-foreground"
          >
            {day}
          </div>
        ))}
        {Array.from({ length: startDay }, (_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const isSelected =
            selectedDate.year === currentMonth.year &&
            selectedDate.month === currentMonth.month &&
            selectedDate.day === day;

          return (
            <div key={`${day}--wrapper`} className="flex justify-center w-full">
              <Button
                key={day}
                className="flex items-center justify-center min-w-[unset] min-h-[unset] w-8 h-8 p-0 sm:w-14 sm:h-14 sm:text-2xl md:w-20 md:h-20 lg:w-28 lg:h-28 lg:text-3xl"
                color={isSelected ? "primary" : "default"}
                variant="bordered"
                onPress={() => handleDateClick(day)}
              >
                {day}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BigCalendar;
