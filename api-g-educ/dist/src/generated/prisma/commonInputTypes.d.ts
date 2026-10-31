import type * as runtime from "@prisma/client/runtime/client";
import * as $Enums from "./enums.js";
import type * as Prisma from "./internal/prismaNamespace.js";
export type UuidFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedUuidFilter<$PrismaModel> | string;
};
export type StringFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringFilter<$PrismaModel> | string;
};
export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeFilter<$PrismaModel> | Date | string;
};
export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolFilter<$PrismaModel> | boolean;
};
export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedUuidWithAggregatesFilter<$PrismaModel> | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedStringFilter<$PrismaModel>;
    _max?: Prisma.NestedStringFilter<$PrismaModel>;
};
export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedStringFilter<$PrismaModel>;
    _max?: Prisma.NestedStringFilter<$PrismaModel>;
};
export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeFilter<$PrismaModel>;
};
export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedBoolFilter<$PrismaModel>;
    _max?: Prisma.NestedBoolFilter<$PrismaModel>;
};
export type EnumSchoolCycleFilter<$PrismaModel = never> = {
    equals?: $Enums.SchoolCycle | Prisma.EnumSchoolCycleFieldRefInput<$PrismaModel>;
    in?: $Enums.SchoolCycle[] | Prisma.ListEnumSchoolCycleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SchoolCycle[] | Prisma.ListEnumSchoolCycleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSchoolCycleFilter<$PrismaModel> | $Enums.SchoolCycle;
};
export type EnumClassLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.ClassLevel | Prisma.EnumClassLevelFieldRefInput<$PrismaModel>;
    in?: $Enums.ClassLevel[] | Prisma.ListEnumClassLevelFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ClassLevel[] | Prisma.ListEnumClassLevelFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumClassLevelFilter<$PrismaModel> | $Enums.ClassLevel;
};
export type EnumClassSeriesNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.ClassSeries | Prisma.EnumClassSeriesFieldRefInput<$PrismaModel> | null;
    in?: $Enums.ClassSeries[] | Prisma.ListEnumClassSeriesFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.ClassSeries[] | Prisma.ListEnumClassSeriesFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumClassSeriesNullableFilter<$PrismaModel> | $Enums.ClassSeries | null;
};
export type IntFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntFilter<$PrismaModel> | number;
};
export type SortOrderInput = {
    sort: Prisma.SortOrder;
    nulls?: Prisma.NullsOrder;
};
export type EnumSchoolCycleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SchoolCycle | Prisma.EnumSchoolCycleFieldRefInput<$PrismaModel>;
    in?: $Enums.SchoolCycle[] | Prisma.ListEnumSchoolCycleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SchoolCycle[] | Prisma.ListEnumSchoolCycleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSchoolCycleWithAggregatesFilter<$PrismaModel> | $Enums.SchoolCycle;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumSchoolCycleFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumSchoolCycleFilter<$PrismaModel>;
};
export type EnumClassLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ClassLevel | Prisma.EnumClassLevelFieldRefInput<$PrismaModel>;
    in?: $Enums.ClassLevel[] | Prisma.ListEnumClassLevelFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ClassLevel[] | Prisma.ListEnumClassLevelFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumClassLevelWithAggregatesFilter<$PrismaModel> | $Enums.ClassLevel;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumClassLevelFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumClassLevelFilter<$PrismaModel>;
};
export type EnumClassSeriesNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ClassSeries | Prisma.EnumClassSeriesFieldRefInput<$PrismaModel> | null;
    in?: $Enums.ClassSeries[] | Prisma.ListEnumClassSeriesFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.ClassSeries[] | Prisma.ListEnumClassSeriesFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumClassSeriesNullableWithAggregatesFilter<$PrismaModel> | $Enums.ClassSeries | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumClassSeriesNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumClassSeriesNullableFilter<$PrismaModel>;
};
export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedIntFilter<$PrismaModel>;
    _max?: Prisma.NestedIntFilter<$PrismaModel>;
};
export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableFilter<$PrismaModel> | number | null;
};
export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedIntNullableFilter<$PrismaModel>;
};
export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | Prisma.EnumRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.Role[] | Prisma.ListEnumRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Role[] | Prisma.ListEnumRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRoleFilter<$PrismaModel> | $Enums.Role;
};
export type EnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | Prisma.EnumUserStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus;
};
export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
};
export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | Prisma.EnumRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.Role[] | Prisma.ListEnumRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Role[] | Prisma.ListEnumRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumRoleFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumRoleFilter<$PrismaModel>;
};
export type EnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | Prisma.EnumUserStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumUserStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumUserStatusFilter<$PrismaModel>;
};
export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
};
export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringNullableFilter<$PrismaModel> | string | null;
};
export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedStringNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedStringNullableFilter<$PrismaModel>;
};
export type EnumRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestStatus | Prisma.EnumRequestStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.RequestStatus[] | Prisma.ListEnumRequestStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RequestStatus[] | Prisma.ListEnumRequestStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRequestStatusFilter<$PrismaModel> | $Enums.RequestStatus;
};
export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedUuidNullableFilter<$PrismaModel> | string | null;
};
export type EnumRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestStatus | Prisma.EnumRequestStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.RequestStatus[] | Prisma.ListEnumRequestStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RequestStatus[] | Prisma.ListEnumRequestStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.RequestStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumRequestStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumRequestStatusFilter<$PrismaModel>;
};
export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedStringNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedStringNullableFilter<$PrismaModel>;
};
export type EnumOtpPurposeFilter<$PrismaModel = never> = {
    equals?: $Enums.OtpPurpose | Prisma.EnumOtpPurposeFieldRefInput<$PrismaModel>;
    in?: $Enums.OtpPurpose[] | Prisma.ListEnumOtpPurposeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OtpPurpose[] | Prisma.ListEnumOtpPurposeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumOtpPurposeFilter<$PrismaModel> | $Enums.OtpPurpose;
};
export type EnumOtpPurposeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OtpPurpose | Prisma.EnumOtpPurposeFieldRefInput<$PrismaModel>;
    in?: $Enums.OtpPurpose[] | Prisma.ListEnumOtpPurposeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OtpPurpose[] | Prisma.ListEnumOtpPurposeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumOtpPurposeWithAggregatesFilter<$PrismaModel> | $Enums.OtpPurpose;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumOtpPurposeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumOtpPurposeFilter<$PrismaModel>;
};
export type EnumContentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ContentStatus | Prisma.EnumContentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ContentStatus[] | Prisma.ListEnumContentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ContentStatus[] | Prisma.ListEnumContentStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumContentStatusFilter<$PrismaModel> | $Enums.ContentStatus;
};
export type EnumContentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ContentStatus | Prisma.EnumContentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ContentStatus[] | Prisma.ListEnumContentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ContentStatus[] | Prisma.ListEnumContentStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumContentStatusWithAggregatesFilter<$PrismaModel> | $Enums.ContentStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumContentStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumContentStatusFilter<$PrismaModel>;
};
export type EnumLessonTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.LessonType | Prisma.EnumLessonTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.LessonType[] | Prisma.ListEnumLessonTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LessonType[] | Prisma.ListEnumLessonTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLessonTypeFilter<$PrismaModel> | $Enums.LessonType;
};
export type EnumLessonTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LessonType | Prisma.EnumLessonTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.LessonType[] | Prisma.ListEnumLessonTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LessonType[] | Prisma.ListEnumLessonTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLessonTypeWithAggregatesFilter<$PrismaModel> | $Enums.LessonType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumLessonTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumLessonTypeFilter<$PrismaModel>;
};
export type EnumAssetKindFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetKind | Prisma.EnumAssetKindFieldRefInput<$PrismaModel>;
    in?: $Enums.AssetKind[] | Prisma.ListEnumAssetKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AssetKind[] | Prisma.ListEnumAssetKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAssetKindFilter<$PrismaModel> | $Enums.AssetKind;
};
export type EnumVideoQualityNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.VideoQuality | Prisma.EnumVideoQualityFieldRefInput<$PrismaModel> | null;
    in?: $Enums.VideoQuality[] | Prisma.ListEnumVideoQualityFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.VideoQuality[] | Prisma.ListEnumVideoQualityFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumVideoQualityNullableFilter<$PrismaModel> | $Enums.VideoQuality | null;
};
export type EnumAssetProcessingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetProcessingStatus | Prisma.EnumAssetProcessingStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.AssetProcessingStatus[] | Prisma.ListEnumAssetProcessingStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AssetProcessingStatus[] | Prisma.ListEnumAssetProcessingStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAssetProcessingStatusFilter<$PrismaModel> | $Enums.AssetProcessingStatus;
};
export type EnumAssetKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetKind | Prisma.EnumAssetKindFieldRefInput<$PrismaModel>;
    in?: $Enums.AssetKind[] | Prisma.ListEnumAssetKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AssetKind[] | Prisma.ListEnumAssetKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAssetKindWithAggregatesFilter<$PrismaModel> | $Enums.AssetKind;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumAssetKindFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumAssetKindFilter<$PrismaModel>;
};
export type EnumVideoQualityNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VideoQuality | Prisma.EnumVideoQualityFieldRefInput<$PrismaModel> | null;
    in?: $Enums.VideoQuality[] | Prisma.ListEnumVideoQualityFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.VideoQuality[] | Prisma.ListEnumVideoQualityFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumVideoQualityNullableWithAggregatesFilter<$PrismaModel> | $Enums.VideoQuality | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumVideoQualityNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumVideoQualityNullableFilter<$PrismaModel>;
};
export type EnumAssetProcessingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetProcessingStatus | Prisma.EnumAssetProcessingStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.AssetProcessingStatus[] | Prisma.ListEnumAssetProcessingStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AssetProcessingStatus[] | Prisma.ListEnumAssetProcessingStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAssetProcessingStatusWithAggregatesFilter<$PrismaModel> | $Enums.AssetProcessingStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumAssetProcessingStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumAssetProcessingStatusFilter<$PrismaModel>;
};
export type EnumAssessmentKindFilter<$PrismaModel = never> = {
    equals?: $Enums.AssessmentKind | Prisma.EnumAssessmentKindFieldRefInput<$PrismaModel>;
    in?: $Enums.AssessmentKind[] | Prisma.ListEnumAssessmentKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AssessmentKind[] | Prisma.ListEnumAssessmentKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAssessmentKindFilter<$PrismaModel> | $Enums.AssessmentKind;
};
export type EnumAssessmentKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AssessmentKind | Prisma.EnumAssessmentKindFieldRefInput<$PrismaModel>;
    in?: $Enums.AssessmentKind[] | Prisma.ListEnumAssessmentKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AssessmentKind[] | Prisma.ListEnumAssessmentKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAssessmentKindWithAggregatesFilter<$PrismaModel> | $Enums.AssessmentKind;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumAssessmentKindFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumAssessmentKindFilter<$PrismaModel>;
};
export type EnumQuestionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionType | Prisma.EnumQuestionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.QuestionType[] | Prisma.ListEnumQuestionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.QuestionType[] | Prisma.ListEnumQuestionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumQuestionTypeFilter<$PrismaModel> | $Enums.QuestionType;
};
export type EnumQuestionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionType | Prisma.EnumQuestionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.QuestionType[] | Prisma.ListEnumQuestionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.QuestionType[] | Prisma.ListEnumQuestionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumQuestionTypeWithAggregatesFilter<$PrismaModel> | $Enums.QuestionType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumQuestionTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumQuestionTypeFilter<$PrismaModel>;
};
export type EnumAttemptStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AttemptStatus | Prisma.EnumAttemptStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.AttemptStatus[] | Prisma.ListEnumAttemptStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AttemptStatus[] | Prisma.ListEnumAttemptStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAttemptStatusFilter<$PrismaModel> | $Enums.AttemptStatus;
};
export type EnumAttemptStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AttemptStatus | Prisma.EnumAttemptStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.AttemptStatus[] | Prisma.ListEnumAttemptStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AttemptStatus[] | Prisma.ListEnumAttemptStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAttemptStatusWithAggregatesFilter<$PrismaModel> | $Enums.AttemptStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumAttemptStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumAttemptStatusFilter<$PrismaModel>;
};
export type EnumRecurrenceFilter<$PrismaModel = never> = {
    equals?: $Enums.Recurrence | Prisma.EnumRecurrenceFieldRefInput<$PrismaModel>;
    in?: $Enums.Recurrence[] | Prisma.ListEnumRecurrenceFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Recurrence[] | Prisma.ListEnumRecurrenceFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRecurrenceFilter<$PrismaModel> | $Enums.Recurrence;
};
export type EnumRecurrenceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Recurrence | Prisma.EnumRecurrenceFieldRefInput<$PrismaModel>;
    in?: $Enums.Recurrence[] | Prisma.ListEnumRecurrenceFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Recurrence[] | Prisma.ListEnumRecurrenceFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRecurrenceWithAggregatesFilter<$PrismaModel> | $Enums.Recurrence;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumRecurrenceFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumRecurrenceFilter<$PrismaModel>;
};
export type EnumEventTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.EventType | Prisma.EnumEventTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.EventType[] | Prisma.ListEnumEventTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.EventType[] | Prisma.ListEnumEventTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumEventTypeFilter<$PrismaModel> | $Enums.EventType;
};
export type EnumEventTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EventType | Prisma.EnumEventTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.EventType[] | Prisma.ListEnumEventTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.EventType[] | Prisma.ListEnumEventTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumEventTypeWithAggregatesFilter<$PrismaModel> | $Enums.EventType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumEventTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumEventTypeFilter<$PrismaModel>;
};
export type EnumReminderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReminderStatus | Prisma.EnumReminderStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ReminderStatus[] | Prisma.ListEnumReminderStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReminderStatus[] | Prisma.ListEnumReminderStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReminderStatusFilter<$PrismaModel> | $Enums.ReminderStatus;
};
export type EnumReminderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReminderStatus | Prisma.EnumReminderStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ReminderStatus[] | Prisma.ListEnumReminderStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReminderStatus[] | Prisma.ListEnumReminderStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReminderStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReminderStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumReminderStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumReminderStatusFilter<$PrismaModel>;
};
export type EnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | Prisma.EnumNotificationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType;
};
export type JsonNullableFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>, Required<JsonNullableFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>;
export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
};
export type EnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | Prisma.EnumNotificationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel>;
};
export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>, Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>;
export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedJsonNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedJsonNullableFilter<$PrismaModel>;
};
export type EnumDevicePlatformFilter<$PrismaModel = never> = {
    equals?: $Enums.DevicePlatform | Prisma.EnumDevicePlatformFieldRefInput<$PrismaModel>;
    in?: $Enums.DevicePlatform[] | Prisma.ListEnumDevicePlatformFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DevicePlatform[] | Prisma.ListEnumDevicePlatformFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDevicePlatformFilter<$PrismaModel> | $Enums.DevicePlatform;
};
export type EnumDevicePlatformWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DevicePlatform | Prisma.EnumDevicePlatformFieldRefInput<$PrismaModel>;
    in?: $Enums.DevicePlatform[] | Prisma.ListEnumDevicePlatformFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DevicePlatform[] | Prisma.ListEnumDevicePlatformFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDevicePlatformWithAggregatesFilter<$PrismaModel> | $Enums.DevicePlatform;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumDevicePlatformFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumDevicePlatformFilter<$PrismaModel>;
};
export type EnumActivityTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ActivityType | Prisma.EnumActivityTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ActivityType[] | Prisma.ListEnumActivityTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ActivityType[] | Prisma.ListEnumActivityTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumActivityTypeFilter<$PrismaModel> | $Enums.ActivityType;
};
export type EnumActivityRefTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ActivityRefType | Prisma.EnumActivityRefTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ActivityRefType[] | Prisma.ListEnumActivityRefTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ActivityRefType[] | Prisma.ListEnumActivityRefTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumActivityRefTypeFilter<$PrismaModel> | $Enums.ActivityRefType;
};
export type EnumActivityTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ActivityType | Prisma.EnumActivityTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ActivityType[] | Prisma.ListEnumActivityTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ActivityType[] | Prisma.ListEnumActivityTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumActivityTypeWithAggregatesFilter<$PrismaModel> | $Enums.ActivityType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumActivityTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumActivityTypeFilter<$PrismaModel>;
};
export type EnumActivityRefTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ActivityRefType | Prisma.EnumActivityRefTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ActivityRefType[] | Prisma.ListEnumActivityRefTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ActivityRefType[] | Prisma.ListEnumActivityRefTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumActivityRefTypeWithAggregatesFilter<$PrismaModel> | $Enums.ActivityRefType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumActivityRefTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumActivityRefTypeFilter<$PrismaModel>;
};
export type EnumContributionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ContributionStatus | Prisma.EnumContributionStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ContributionStatus[] | Prisma.ListEnumContributionStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ContributionStatus[] | Prisma.ListEnumContributionStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumContributionStatusFilter<$PrismaModel> | $Enums.ContributionStatus;
};
export type DecimalFilter<$PrismaModel = never> = {
    equals?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    in?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel>;
    notIn?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel>;
    lt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    lte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDecimalFilter<$PrismaModel> | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type EnumContributionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ContributionStatus | Prisma.EnumContributionStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ContributionStatus[] | Prisma.ListEnumContributionStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ContributionStatus[] | Prisma.ListEnumContributionStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumContributionStatusWithAggregatesFilter<$PrismaModel> | $Enums.ContributionStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumContributionStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumContributionStatusFilter<$PrismaModel>;
};
export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    in?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel>;
    notIn?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel>;
    lt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    lte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDecimalWithAggregatesFilter<$PrismaModel> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedDecimalFilter<$PrismaModel>;
    _sum?: Prisma.NestedDecimalFilter<$PrismaModel>;
    _min?: Prisma.NestedDecimalFilter<$PrismaModel>;
    _max?: Prisma.NestedDecimalFilter<$PrismaModel>;
};
export type EnumForumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ForumStatus | Prisma.EnumForumStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ForumStatus[] | Prisma.ListEnumForumStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ForumStatus[] | Prisma.ListEnumForumStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumForumStatusFilter<$PrismaModel> | $Enums.ForumStatus;
};
export type EnumForumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ForumStatus | Prisma.EnumForumStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ForumStatus[] | Prisma.ListEnumForumStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ForumStatus[] | Prisma.ListEnumForumStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumForumStatusWithAggregatesFilter<$PrismaModel> | $Enums.ForumStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumForumStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumForumStatusFilter<$PrismaModel>;
};
export type EnumReportReasonFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportReason | Prisma.EnumReportReasonFieldRefInput<$PrismaModel>;
    in?: $Enums.ReportReason[] | Prisma.ListEnumReportReasonFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReportReason[] | Prisma.ListEnumReportReasonFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReportReasonFilter<$PrismaModel> | $Enums.ReportReason;
};
export type EnumReportStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | Prisma.EnumReportStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ReportStatus[] | Prisma.ListEnumReportStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReportStatus[] | Prisma.ListEnumReportStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReportStatusFilter<$PrismaModel> | $Enums.ReportStatus;
};
export type EnumReportReasonWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportReason | Prisma.EnumReportReasonFieldRefInput<$PrismaModel>;
    in?: $Enums.ReportReason[] | Prisma.ListEnumReportReasonFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReportReason[] | Prisma.ListEnumReportReasonFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReportReasonWithAggregatesFilter<$PrismaModel> | $Enums.ReportReason;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumReportReasonFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumReportReasonFilter<$PrismaModel>;
};
export type EnumReportStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | Prisma.EnumReportStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ReportStatus[] | Prisma.ListEnumReportStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReportStatus[] | Prisma.ListEnumReportStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReportStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReportStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumReportStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumReportStatusFilter<$PrismaModel>;
};
export type EnumSanctionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SanctionType | Prisma.EnumSanctionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.SanctionType[] | Prisma.ListEnumSanctionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SanctionType[] | Prisma.ListEnumSanctionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSanctionTypeFilter<$PrismaModel> | $Enums.SanctionType;
};
export type EnumSanctionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SanctionType | Prisma.EnumSanctionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.SanctionType[] | Prisma.ListEnumSanctionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SanctionType[] | Prisma.ListEnumSanctionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSanctionTypeWithAggregatesFilter<$PrismaModel> | $Enums.SanctionType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumSanctionTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumSanctionTypeFilter<$PrismaModel>;
};
export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    in?: bigint[] | number[] | Prisma.ListBigIntFieldRefInput<$PrismaModel>;
    notIn?: bigint[] | number[] | Prisma.ListBigIntFieldRefInput<$PrismaModel>;
    lt?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    lte?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    gt?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    gte?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBigIntFilter<$PrismaModel> | bigint | number;
};
export type EnumRoleNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | Prisma.EnumRoleFieldRefInput<$PrismaModel> | null;
    in?: $Enums.Role[] | Prisma.ListEnumRoleFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.Role[] | Prisma.ListEnumRoleFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumRoleNullableFilter<$PrismaModel> | $Enums.Role | null;
};
export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    in?: bigint[] | number[] | Prisma.ListBigIntFieldRefInput<$PrismaModel>;
    notIn?: bigint[] | number[] | Prisma.ListBigIntFieldRefInput<$PrismaModel>;
    lt?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    lte?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    gt?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    gte?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedBigIntFilter<$PrismaModel>;
    _min?: Prisma.NestedBigIntFilter<$PrismaModel>;
    _max?: Prisma.NestedBigIntFilter<$PrismaModel>;
};
export type EnumRoleNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | Prisma.EnumRoleFieldRefInput<$PrismaModel> | null;
    in?: $Enums.Role[] | Prisma.ListEnumRoleFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.Role[] | Prisma.ListEnumRoleFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumRoleNullableWithAggregatesFilter<$PrismaModel> | $Enums.Role | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumRoleNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumRoleNullableFilter<$PrismaModel>;
};
export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedUuidFilter<$PrismaModel> | string;
};
export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringFilter<$PrismaModel> | string;
};
export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeFilter<$PrismaModel> | Date | string;
};
export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolFilter<$PrismaModel> | boolean;
};
export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedUuidWithAggregatesFilter<$PrismaModel> | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedStringFilter<$PrismaModel>;
    _max?: Prisma.NestedStringFilter<$PrismaModel>;
};
export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntFilter<$PrismaModel> | number;
};
export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedStringFilter<$PrismaModel>;
    _max?: Prisma.NestedStringFilter<$PrismaModel>;
};
export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeFilter<$PrismaModel>;
};
export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedBoolFilter<$PrismaModel>;
    _max?: Prisma.NestedBoolFilter<$PrismaModel>;
};
export type NestedEnumSchoolCycleFilter<$PrismaModel = never> = {
    equals?: $Enums.SchoolCycle | Prisma.EnumSchoolCycleFieldRefInput<$PrismaModel>;
    in?: $Enums.SchoolCycle[] | Prisma.ListEnumSchoolCycleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SchoolCycle[] | Prisma.ListEnumSchoolCycleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSchoolCycleFilter<$PrismaModel> | $Enums.SchoolCycle;
};
export type NestedEnumClassLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.ClassLevel | Prisma.EnumClassLevelFieldRefInput<$PrismaModel>;
    in?: $Enums.ClassLevel[] | Prisma.ListEnumClassLevelFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ClassLevel[] | Prisma.ListEnumClassLevelFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumClassLevelFilter<$PrismaModel> | $Enums.ClassLevel;
};
export type NestedEnumClassSeriesNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.ClassSeries | Prisma.EnumClassSeriesFieldRefInput<$PrismaModel> | null;
    in?: $Enums.ClassSeries[] | Prisma.ListEnumClassSeriesFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.ClassSeries[] | Prisma.ListEnumClassSeriesFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumClassSeriesNullableFilter<$PrismaModel> | $Enums.ClassSeries | null;
};
export type NestedEnumSchoolCycleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SchoolCycle | Prisma.EnumSchoolCycleFieldRefInput<$PrismaModel>;
    in?: $Enums.SchoolCycle[] | Prisma.ListEnumSchoolCycleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SchoolCycle[] | Prisma.ListEnumSchoolCycleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSchoolCycleWithAggregatesFilter<$PrismaModel> | $Enums.SchoolCycle;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumSchoolCycleFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumSchoolCycleFilter<$PrismaModel>;
};
export type NestedEnumClassLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ClassLevel | Prisma.EnumClassLevelFieldRefInput<$PrismaModel>;
    in?: $Enums.ClassLevel[] | Prisma.ListEnumClassLevelFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ClassLevel[] | Prisma.ListEnumClassLevelFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumClassLevelWithAggregatesFilter<$PrismaModel> | $Enums.ClassLevel;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumClassLevelFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumClassLevelFilter<$PrismaModel>;
};
export type NestedEnumClassSeriesNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ClassSeries | Prisma.EnumClassSeriesFieldRefInput<$PrismaModel> | null;
    in?: $Enums.ClassSeries[] | Prisma.ListEnumClassSeriesFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.ClassSeries[] | Prisma.ListEnumClassSeriesFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumClassSeriesNullableWithAggregatesFilter<$PrismaModel> | $Enums.ClassSeries | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumClassSeriesNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumClassSeriesNullableFilter<$PrismaModel>;
};
export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableFilter<$PrismaModel> | number | null;
};
export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedIntFilter<$PrismaModel>;
    _max?: Prisma.NestedIntFilter<$PrismaModel>;
};
export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatFilter<$PrismaModel> | number;
};
export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedIntNullableFilter<$PrismaModel>;
};
export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatNullableFilter<$PrismaModel> | number | null;
};
export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | Prisma.EnumRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.Role[] | Prisma.ListEnumRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Role[] | Prisma.ListEnumRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRoleFilter<$PrismaModel> | $Enums.Role;
};
export type NestedEnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | Prisma.EnumUserStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus;
};
export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
};
export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | Prisma.EnumRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.Role[] | Prisma.ListEnumRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Role[] | Prisma.ListEnumRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumRoleFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumRoleFilter<$PrismaModel>;
};
export type NestedEnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | Prisma.EnumUserStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumUserStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumUserStatusFilter<$PrismaModel>;
};
export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
};
export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringNullableFilter<$PrismaModel> | string | null;
};
export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedStringNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedStringNullableFilter<$PrismaModel>;
};
export type NestedEnumRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestStatus | Prisma.EnumRequestStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.RequestStatus[] | Prisma.ListEnumRequestStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RequestStatus[] | Prisma.ListEnumRequestStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRequestStatusFilter<$PrismaModel> | $Enums.RequestStatus;
};
export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedUuidNullableFilter<$PrismaModel> | string | null;
};
export type NestedEnumRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestStatus | Prisma.EnumRequestStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.RequestStatus[] | Prisma.ListEnumRequestStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RequestStatus[] | Prisma.ListEnumRequestStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.RequestStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumRequestStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumRequestStatusFilter<$PrismaModel>;
};
export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedStringNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedStringNullableFilter<$PrismaModel>;
};
export type NestedEnumOtpPurposeFilter<$PrismaModel = never> = {
    equals?: $Enums.OtpPurpose | Prisma.EnumOtpPurposeFieldRefInput<$PrismaModel>;
    in?: $Enums.OtpPurpose[] | Prisma.ListEnumOtpPurposeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OtpPurpose[] | Prisma.ListEnumOtpPurposeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumOtpPurposeFilter<$PrismaModel> | $Enums.OtpPurpose;
};
export type NestedEnumOtpPurposeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OtpPurpose | Prisma.EnumOtpPurposeFieldRefInput<$PrismaModel>;
    in?: $Enums.OtpPurpose[] | Prisma.ListEnumOtpPurposeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OtpPurpose[] | Prisma.ListEnumOtpPurposeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumOtpPurposeWithAggregatesFilter<$PrismaModel> | $Enums.OtpPurpose;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumOtpPurposeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumOtpPurposeFilter<$PrismaModel>;
};
export type NestedEnumContentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ContentStatus | Prisma.EnumContentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ContentStatus[] | Prisma.ListEnumContentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ContentStatus[] | Prisma.ListEnumContentStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumContentStatusFilter<$PrismaModel> | $Enums.ContentStatus;
};
export type NestedEnumContentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ContentStatus | Prisma.EnumContentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ContentStatus[] | Prisma.ListEnumContentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ContentStatus[] | Prisma.ListEnumContentStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumContentStatusWithAggregatesFilter<$PrismaModel> | $Enums.ContentStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumContentStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumContentStatusFilter<$PrismaModel>;
};
export type NestedEnumLessonTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.LessonType | Prisma.EnumLessonTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.LessonType[] | Prisma.ListEnumLessonTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LessonType[] | Prisma.ListEnumLessonTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLessonTypeFilter<$PrismaModel> | $Enums.LessonType;
};
export type NestedEnumLessonTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LessonType | Prisma.EnumLessonTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.LessonType[] | Prisma.ListEnumLessonTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LessonType[] | Prisma.ListEnumLessonTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLessonTypeWithAggregatesFilter<$PrismaModel> | $Enums.LessonType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumLessonTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumLessonTypeFilter<$PrismaModel>;
};
export type NestedEnumAssetKindFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetKind | Prisma.EnumAssetKindFieldRefInput<$PrismaModel>;
    in?: $Enums.AssetKind[] | Prisma.ListEnumAssetKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AssetKind[] | Prisma.ListEnumAssetKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAssetKindFilter<$PrismaModel> | $Enums.AssetKind;
};
export type NestedEnumVideoQualityNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.VideoQuality | Prisma.EnumVideoQualityFieldRefInput<$PrismaModel> | null;
    in?: $Enums.VideoQuality[] | Prisma.ListEnumVideoQualityFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.VideoQuality[] | Prisma.ListEnumVideoQualityFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumVideoQualityNullableFilter<$PrismaModel> | $Enums.VideoQuality | null;
};
export type NestedEnumAssetProcessingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetProcessingStatus | Prisma.EnumAssetProcessingStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.AssetProcessingStatus[] | Prisma.ListEnumAssetProcessingStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AssetProcessingStatus[] | Prisma.ListEnumAssetProcessingStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAssetProcessingStatusFilter<$PrismaModel> | $Enums.AssetProcessingStatus;
};
export type NestedEnumAssetKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetKind | Prisma.EnumAssetKindFieldRefInput<$PrismaModel>;
    in?: $Enums.AssetKind[] | Prisma.ListEnumAssetKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AssetKind[] | Prisma.ListEnumAssetKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAssetKindWithAggregatesFilter<$PrismaModel> | $Enums.AssetKind;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumAssetKindFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumAssetKindFilter<$PrismaModel>;
};
export type NestedEnumVideoQualityNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VideoQuality | Prisma.EnumVideoQualityFieldRefInput<$PrismaModel> | null;
    in?: $Enums.VideoQuality[] | Prisma.ListEnumVideoQualityFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.VideoQuality[] | Prisma.ListEnumVideoQualityFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumVideoQualityNullableWithAggregatesFilter<$PrismaModel> | $Enums.VideoQuality | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumVideoQualityNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumVideoQualityNullableFilter<$PrismaModel>;
};
export type NestedEnumAssetProcessingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetProcessingStatus | Prisma.EnumAssetProcessingStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.AssetProcessingStatus[] | Prisma.ListEnumAssetProcessingStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AssetProcessingStatus[] | Prisma.ListEnumAssetProcessingStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAssetProcessingStatusWithAggregatesFilter<$PrismaModel> | $Enums.AssetProcessingStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumAssetProcessingStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumAssetProcessingStatusFilter<$PrismaModel>;
};
export type NestedEnumAssessmentKindFilter<$PrismaModel = never> = {
    equals?: $Enums.AssessmentKind | Prisma.EnumAssessmentKindFieldRefInput<$PrismaModel>;
    in?: $Enums.AssessmentKind[] | Prisma.ListEnumAssessmentKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AssessmentKind[] | Prisma.ListEnumAssessmentKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAssessmentKindFilter<$PrismaModel> | $Enums.AssessmentKind;
};
export type NestedEnumAssessmentKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AssessmentKind | Prisma.EnumAssessmentKindFieldRefInput<$PrismaModel>;
    in?: $Enums.AssessmentKind[] | Prisma.ListEnumAssessmentKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AssessmentKind[] | Prisma.ListEnumAssessmentKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAssessmentKindWithAggregatesFilter<$PrismaModel> | $Enums.AssessmentKind;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumAssessmentKindFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumAssessmentKindFilter<$PrismaModel>;
};
export type NestedEnumQuestionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionType | Prisma.EnumQuestionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.QuestionType[] | Prisma.ListEnumQuestionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.QuestionType[] | Prisma.ListEnumQuestionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumQuestionTypeFilter<$PrismaModel> | $Enums.QuestionType;
};
export type NestedEnumQuestionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionType | Prisma.EnumQuestionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.QuestionType[] | Prisma.ListEnumQuestionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.QuestionType[] | Prisma.ListEnumQuestionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumQuestionTypeWithAggregatesFilter<$PrismaModel> | $Enums.QuestionType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumQuestionTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumQuestionTypeFilter<$PrismaModel>;
};
export type NestedEnumAttemptStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AttemptStatus | Prisma.EnumAttemptStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.AttemptStatus[] | Prisma.ListEnumAttemptStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AttemptStatus[] | Prisma.ListEnumAttemptStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAttemptStatusFilter<$PrismaModel> | $Enums.AttemptStatus;
};
export type NestedEnumAttemptStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AttemptStatus | Prisma.EnumAttemptStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.AttemptStatus[] | Prisma.ListEnumAttemptStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AttemptStatus[] | Prisma.ListEnumAttemptStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAttemptStatusWithAggregatesFilter<$PrismaModel> | $Enums.AttemptStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumAttemptStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumAttemptStatusFilter<$PrismaModel>;
};
export type NestedEnumRecurrenceFilter<$PrismaModel = never> = {
    equals?: $Enums.Recurrence | Prisma.EnumRecurrenceFieldRefInput<$PrismaModel>;
    in?: $Enums.Recurrence[] | Prisma.ListEnumRecurrenceFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Recurrence[] | Prisma.ListEnumRecurrenceFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRecurrenceFilter<$PrismaModel> | $Enums.Recurrence;
};
export type NestedEnumRecurrenceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Recurrence | Prisma.EnumRecurrenceFieldRefInput<$PrismaModel>;
    in?: $Enums.Recurrence[] | Prisma.ListEnumRecurrenceFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Recurrence[] | Prisma.ListEnumRecurrenceFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRecurrenceWithAggregatesFilter<$PrismaModel> | $Enums.Recurrence;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumRecurrenceFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumRecurrenceFilter<$PrismaModel>;
};
export type NestedEnumEventTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.EventType | Prisma.EnumEventTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.EventType[] | Prisma.ListEnumEventTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.EventType[] | Prisma.ListEnumEventTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumEventTypeFilter<$PrismaModel> | $Enums.EventType;
};
export type NestedEnumEventTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EventType | Prisma.EnumEventTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.EventType[] | Prisma.ListEnumEventTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.EventType[] | Prisma.ListEnumEventTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumEventTypeWithAggregatesFilter<$PrismaModel> | $Enums.EventType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumEventTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumEventTypeFilter<$PrismaModel>;
};
export type NestedEnumReminderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReminderStatus | Prisma.EnumReminderStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ReminderStatus[] | Prisma.ListEnumReminderStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReminderStatus[] | Prisma.ListEnumReminderStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReminderStatusFilter<$PrismaModel> | $Enums.ReminderStatus;
};
export type NestedEnumReminderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReminderStatus | Prisma.EnumReminderStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ReminderStatus[] | Prisma.ListEnumReminderStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReminderStatus[] | Prisma.ListEnumReminderStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReminderStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReminderStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumReminderStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumReminderStatusFilter<$PrismaModel>;
};
export type NestedEnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | Prisma.EnumNotificationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType;
};
export type NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | Prisma.EnumNotificationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel>;
};
export type NestedJsonNullableFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>, Required<NestedJsonNullableFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>;
export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
};
export type NestedEnumDevicePlatformFilter<$PrismaModel = never> = {
    equals?: $Enums.DevicePlatform | Prisma.EnumDevicePlatformFieldRefInput<$PrismaModel>;
    in?: $Enums.DevicePlatform[] | Prisma.ListEnumDevicePlatformFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DevicePlatform[] | Prisma.ListEnumDevicePlatformFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDevicePlatformFilter<$PrismaModel> | $Enums.DevicePlatform;
};
export type NestedEnumDevicePlatformWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DevicePlatform | Prisma.EnumDevicePlatformFieldRefInput<$PrismaModel>;
    in?: $Enums.DevicePlatform[] | Prisma.ListEnumDevicePlatformFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DevicePlatform[] | Prisma.ListEnumDevicePlatformFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDevicePlatformWithAggregatesFilter<$PrismaModel> | $Enums.DevicePlatform;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumDevicePlatformFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumDevicePlatformFilter<$PrismaModel>;
};
export type NestedEnumActivityTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ActivityType | Prisma.EnumActivityTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ActivityType[] | Prisma.ListEnumActivityTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ActivityType[] | Prisma.ListEnumActivityTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumActivityTypeFilter<$PrismaModel> | $Enums.ActivityType;
};
export type NestedEnumActivityRefTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ActivityRefType | Prisma.EnumActivityRefTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ActivityRefType[] | Prisma.ListEnumActivityRefTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ActivityRefType[] | Prisma.ListEnumActivityRefTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumActivityRefTypeFilter<$PrismaModel> | $Enums.ActivityRefType;
};
export type NestedEnumActivityTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ActivityType | Prisma.EnumActivityTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ActivityType[] | Prisma.ListEnumActivityTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ActivityType[] | Prisma.ListEnumActivityTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumActivityTypeWithAggregatesFilter<$PrismaModel> | $Enums.ActivityType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumActivityTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumActivityTypeFilter<$PrismaModel>;
};
export type NestedEnumActivityRefTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ActivityRefType | Prisma.EnumActivityRefTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ActivityRefType[] | Prisma.ListEnumActivityRefTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ActivityRefType[] | Prisma.ListEnumActivityRefTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumActivityRefTypeWithAggregatesFilter<$PrismaModel> | $Enums.ActivityRefType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumActivityRefTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumActivityRefTypeFilter<$PrismaModel>;
};
export type NestedEnumContributionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ContributionStatus | Prisma.EnumContributionStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ContributionStatus[] | Prisma.ListEnumContributionStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ContributionStatus[] | Prisma.ListEnumContributionStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumContributionStatusFilter<$PrismaModel> | $Enums.ContributionStatus;
};
export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    in?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel>;
    notIn?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel>;
    lt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    lte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDecimalFilter<$PrismaModel> | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type NestedEnumContributionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ContributionStatus | Prisma.EnumContributionStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ContributionStatus[] | Prisma.ListEnumContributionStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ContributionStatus[] | Prisma.ListEnumContributionStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumContributionStatusWithAggregatesFilter<$PrismaModel> | $Enums.ContributionStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumContributionStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumContributionStatusFilter<$PrismaModel>;
};
export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    in?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel>;
    notIn?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel>;
    lt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    lte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDecimalWithAggregatesFilter<$PrismaModel> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedDecimalFilter<$PrismaModel>;
    _sum?: Prisma.NestedDecimalFilter<$PrismaModel>;
    _min?: Prisma.NestedDecimalFilter<$PrismaModel>;
    _max?: Prisma.NestedDecimalFilter<$PrismaModel>;
};
export type NestedEnumForumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ForumStatus | Prisma.EnumForumStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ForumStatus[] | Prisma.ListEnumForumStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ForumStatus[] | Prisma.ListEnumForumStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumForumStatusFilter<$PrismaModel> | $Enums.ForumStatus;
};
export type NestedEnumForumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ForumStatus | Prisma.EnumForumStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ForumStatus[] | Prisma.ListEnumForumStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ForumStatus[] | Prisma.ListEnumForumStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumForumStatusWithAggregatesFilter<$PrismaModel> | $Enums.ForumStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumForumStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumForumStatusFilter<$PrismaModel>;
};
export type NestedEnumReportReasonFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportReason | Prisma.EnumReportReasonFieldRefInput<$PrismaModel>;
    in?: $Enums.ReportReason[] | Prisma.ListEnumReportReasonFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReportReason[] | Prisma.ListEnumReportReasonFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReportReasonFilter<$PrismaModel> | $Enums.ReportReason;
};
export type NestedEnumReportStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | Prisma.EnumReportStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ReportStatus[] | Prisma.ListEnumReportStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReportStatus[] | Prisma.ListEnumReportStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReportStatusFilter<$PrismaModel> | $Enums.ReportStatus;
};
export type NestedEnumReportReasonWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportReason | Prisma.EnumReportReasonFieldRefInput<$PrismaModel>;
    in?: $Enums.ReportReason[] | Prisma.ListEnumReportReasonFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReportReason[] | Prisma.ListEnumReportReasonFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReportReasonWithAggregatesFilter<$PrismaModel> | $Enums.ReportReason;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumReportReasonFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumReportReasonFilter<$PrismaModel>;
};
export type NestedEnumReportStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | Prisma.EnumReportStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ReportStatus[] | Prisma.ListEnumReportStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReportStatus[] | Prisma.ListEnumReportStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReportStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReportStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumReportStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumReportStatusFilter<$PrismaModel>;
};
export type NestedEnumSanctionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SanctionType | Prisma.EnumSanctionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.SanctionType[] | Prisma.ListEnumSanctionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SanctionType[] | Prisma.ListEnumSanctionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSanctionTypeFilter<$PrismaModel> | $Enums.SanctionType;
};
export type NestedEnumSanctionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SanctionType | Prisma.EnumSanctionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.SanctionType[] | Prisma.ListEnumSanctionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SanctionType[] | Prisma.ListEnumSanctionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSanctionTypeWithAggregatesFilter<$PrismaModel> | $Enums.SanctionType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumSanctionTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumSanctionTypeFilter<$PrismaModel>;
};
export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    in?: bigint[] | number[] | Prisma.ListBigIntFieldRefInput<$PrismaModel>;
    notIn?: bigint[] | number[] | Prisma.ListBigIntFieldRefInput<$PrismaModel>;
    lt?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    lte?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    gt?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    gte?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBigIntFilter<$PrismaModel> | bigint | number;
};
export type NestedEnumRoleNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | Prisma.EnumRoleFieldRefInput<$PrismaModel> | null;
    in?: $Enums.Role[] | Prisma.ListEnumRoleFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.Role[] | Prisma.ListEnumRoleFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumRoleNullableFilter<$PrismaModel> | $Enums.Role | null;
};
export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    in?: bigint[] | number[] | Prisma.ListBigIntFieldRefInput<$PrismaModel>;
    notIn?: bigint[] | number[] | Prisma.ListBigIntFieldRefInput<$PrismaModel>;
    lt?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    lte?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    gt?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    gte?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedBigIntFilter<$PrismaModel>;
    _min?: Prisma.NestedBigIntFilter<$PrismaModel>;
    _max?: Prisma.NestedBigIntFilter<$PrismaModel>;
};
export type NestedEnumRoleNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | Prisma.EnumRoleFieldRefInput<$PrismaModel> | null;
    in?: $Enums.Role[] | Prisma.ListEnumRoleFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.Role[] | Prisma.ListEnumRoleFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumRoleNullableWithAggregatesFilter<$PrismaModel> | $Enums.Role | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumRoleNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumRoleNullableFilter<$PrismaModel>;
};
