using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TheEncoreAgenda.Data.Migrations
{
    /// <inheritdoc />
    public partial class addleaderboard2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Audios_CalendarEvents_CalendarEventId",
                table: "Audios");

            migrationBuilder.AlterColumn<int>(
                name: "CalendarEventId",
                table: "Audios",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Audios_CalendarEvents_CalendarEventId",
                table: "Audios",
                column: "CalendarEventId",
                principalTable: "CalendarEvents",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Audios_CalendarEvents_CalendarEventId",
                table: "Audios");

            migrationBuilder.AlterColumn<int>(
                name: "CalendarEventId",
                table: "Audios",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Audios_CalendarEvents_CalendarEventId",
                table: "Audios",
                column: "CalendarEventId",
                principalTable: "CalendarEvents",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
