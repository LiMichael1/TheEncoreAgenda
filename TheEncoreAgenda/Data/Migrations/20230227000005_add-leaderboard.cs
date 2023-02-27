using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TheEncoreAgenda.Data.Migrations
{
    /// <inheritdoc />
    public partial class addleaderboard : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CalendarEventId",
                table: "Audios",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Audios_CalendarEventId",
                table: "Audios",
                column: "CalendarEventId");

            migrationBuilder.AddForeignKey(
                name: "FK_Audios_CalendarEvents_CalendarEventId",
                table: "Audios",
                column: "CalendarEventId",
                principalTable: "CalendarEvents",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Audios_CalendarEvents_CalendarEventId",
                table: "Audios");

            migrationBuilder.DropIndex(
                name: "IX_Audios_CalendarEventId",
                table: "Audios");

            migrationBuilder.DropColumn(
                name: "CalendarEventId",
                table: "Audios");
        }
    }
}
