using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TheEncoreAgenda.Data.Migrations
{
    public partial class updatecalendarEvents : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ApplicationUserCalendarEvent_AspNetUsers_UserId",
                table: "ApplicationUserCalendarEvent");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "CalendarEvents");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "ApplicationUserCalendarEvent",
                newName: "UsersId");

            migrationBuilder.RenameIndex(
                name: "IX_ApplicationUserCalendarEvent_UserId",
                table: "ApplicationUserCalendarEvent",
                newName: "IX_ApplicationUserCalendarEvent_UsersId");

            migrationBuilder.AddForeignKey(
                name: "FK_ApplicationUserCalendarEvent_AspNetUsers_UsersId",
                table: "ApplicationUserCalendarEvent",
                column: "UsersId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ApplicationUserCalendarEvent_AspNetUsers_UsersId",
                table: "ApplicationUserCalendarEvent");

            migrationBuilder.RenameColumn(
                name: "UsersId",
                table: "ApplicationUserCalendarEvent",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_ApplicationUserCalendarEvent_UsersId",
                table: "ApplicationUserCalendarEvent",
                newName: "IX_ApplicationUserCalendarEvent_UserId");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "CalendarEvents",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ApplicationUserCalendarEvent_AspNetUsers_UserId",
                table: "ApplicationUserCalendarEvent",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
